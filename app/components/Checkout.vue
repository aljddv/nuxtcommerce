<script setup>
const { checkoutStatus, handleCheckout } = useCheckout();
const { cart } = useCart();

function onSubmit() {
  emit('close-cart-modal');
  setTimeout(() => {
    handleCheckout();
  }, 50);
}
</script>

<template>
  <div class="md:w-96 h-full bg-black/5 dark:bg-white/10 my-3 mr-3 p-3 max-md:ml-3 rounded-3xl">
    <div class="text-xl font-bold px-2 mb-3">Checkout</div>
    <div class="text-sm font-semibold p-4 text-neutral-600 dark:text-neutral-400">
      Paying a total of ${{ cart.reduce((total, item) => total + parseFloat(item.variation.node.salePrice), 0).toFixed(2) }} for {{ cart.length }} products.
    </div>
    <button
      @click="handleCheckout"
      :disabled="checkoutStatus !== 'order'"
      class="pay-button-bezel w-full h-12 rounded-xl relative font-semibold text-white dark:text-black text-lg flex justify-center items-center">
      <Transition name="slide-up">
        <div v-if="checkoutStatus === 'order'" class="absolute">Pay ${{ cart.reduce((total, item) => total + parseFloat(item.variation.node.salePrice), 0).toFixed(2) }}</div>
        <UIcon v-else-if="checkoutStatus === 'processing'" class="absolute" name="i-svg-spinners-90-ring-with-bg" size="22" />
      </Transition>
    </button>
    <div class="text-xs font-medium p-4 flex gap-1 items-end text-neutral-400 dark:text-neutral-600">
      <UIcon name="i-iconamoon-lock-fill" size="18" />
      <div>Your payment is secured by Stripe</div>
    </div>
  </div>
</template>

<style lang="postcss">
:root {
  --background: #fff;
  --border: #ccc;
}
.dark {
  --background: #000;
  --border: #999;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px var(--background, #fff) inset !important;
  box-shadow: 0 0 0px 1000px var(--background, #fff) inset !important;
  border-color: var(--border) !important;
}

.billing input,
.billing textarea {
  @apply block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black focus-visible:dark:border-white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
textarea {
  resize: none;
}
.pay-button-bezel {
  box-shadow: 0 0 0 var(--button-outline, 0px) rgba(92, 222, 131, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
    0 1px 1px 0 rgba(0, 0, 0, 0.3);
  @apply bg-[#23a26d] dark:bg-[#40d195] outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;
  &:hover {
    @apply brightness-110;
  }
  &:active {
    --button-outline: 4px;
    --button-scale: 0.975;
  }
}
</style>
