import { useCart } from './useCart';
import { useRuntimeConfig } from '#imports';
import { saveCart } from '~/composables/store';

export const useCheckout = () => {
  const { cart } = useCart();
  const order = useState('order', () => {});
  const userDetails = useState('userDetails', () => ({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    address1: '',
  }));
  const checkoutStatus = ref('order');

  const handleCheckout = async () => {
    checkoutStatus.value = 'processing';
    const checkoutData = {
      billing: { ...userDetails.value },
      paymentMethod: 'cod',
    };

    await checkout(checkoutData).then(res => {
      cart.value = [];
      localStorage.setItem('cart', JSON.stringify(cart.value));
      order.value = res.checkout.order;
    });
  };

  // Save cart to backend and redirect to checkout page
  const handlePay = async () => {
    try {
      // Save cart to backend (mutation)
      await saveCart(cart.value);
    } catch (e) {
      // Optionally handle error, but still redirect
    }
    // Get backend base URL from env (GQL_HOST)
    let gqlHost = '';
    if (typeof process !== 'undefined' && process.env && process.env.GQL_HOST) {
      gqlHost = process.env.GQL_HOST;
    } else if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.GQL_HOST) {
      gqlHost = import.meta.env.GQL_HOST;
    } else if (window && window.__NUXT__ && window.__NUXT__.config && window.__NUXT__.config.public && window.__NUXT__.config.public.graphql && window.__NUXT__.config.public.graphql.clients && window.__NUXT__.config.public.graphql.clients.default && window.__NUXT__.config.public.graphql.clients.default.endpoint) {
      gqlHost = window.__NUXT__.config.public.graphql.clients.default.endpoint;
    }
    // Ensure we use the protocol and host only
    let backendUrl = '';
    try {
      const url = new URL(gqlHost);
      backendUrl = url.origin;
    } catch (e) {
      // fallback: strip /graphql if present
      backendUrl = gqlHost.replace(/\/graphql$/, '');
    }
    const redirectUrl = `${backendUrl}/checkout`;
    console.log('Redirecting to:', redirectUrl);
    setTimeout(() => {
      try {
        window.location.assign(redirectUrl);
      } catch (e) {
        window.open(redirectUrl, '_self');
      }
    }, 100);
  };

  return { order, userDetails, checkoutStatus, handleCheckout, cart, handlePay };
};
