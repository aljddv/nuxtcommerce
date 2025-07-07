export const useCheckout = () => {
  const { cart } = useCart();
  const order = useState("order", () => {});
  const userDetails = useState("userDetails", () => ({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address1: "",
  }));
  const checkoutStatus = ref("order");

  const handleCheckout = async () => {
    // Build redirect URL to WordPress checkout with all cart items
    const WP_BASE = "https://skyblue-ant-242663.hostingersite.com"; // <-- CHANGE THIS TO YOUR WP SITE
    let url = WP_BASE + "/cart/?";
    // Build query string for all products in cart
    const params = [];
    cart.value.forEach((item) => {
      // Try to get product/variation ID and quantity
      const id =
        item.variation?.node?.databaseId ||
        item.product?.node?.databaseId ||
        item.databaseId ||
        item.id;
      const qty = item.quantity || 1;
      if (id) {
        params.push(`add-to-cart=${id}`);
        if (qty > 1) params.push(`quantity[${id}]=${qty}`);
      }
    });
    url += params.join("&");
    // Clear cart in Nuxt app before redirecting
    cart.value = [];
    localStorage.setItem('cart', JSON.stringify([]));
    // Redirect to WordPress checkout
    window.location.href = url;
  };
  return { order, userDetails, checkoutStatus, handleCheckout };
};
