<script setup>
import { useCheckout } from '../composables/useCheckout';
const { cart, handlePay } = useCheckout();
</script>

<template>
  <div class="md:w-96 h-full bg-black/5 dark:bg-white/10 my-3 mr-3 p-3 max-md:ml-3 rounded-3xl">
    <div class="text-xl font-bold px-2 mb-3">Checkout</div>
    <div class="flex flex-col items-center justify-center">
      <div class="w-full">
        <div v-for="product in cart" :key="product.key" class="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
          <div class="flex-1">
            <div class="font-medium text-sm">{{ product.product.node.name }}</div>
            <div class="text-xs text-neutral-500">Size: {{ product.variation.attributes.map(attr => attr.value.toUpperCase()).join(', ') }} • Qty: {{ product.quantity }}</div>
          </div>
          <div class="font-bold text-right">${{ Number(product.variation.node.salePrice).toFixed(2) }}</div>
        </div>
      </div>
      <div class="text-sm font-semibold p-4 text-neutral-600 dark:text-neutral-400">
        Total: ${{ cart.reduce((total, item) => total + parseFloat(item.variation.node.salePrice), 0).toFixed(2) }} for {{ cart.length }} products.
      </div>
      <button
        @click="handlePay"
        class="pay-button-bezel w-full h-12 rounded-xl relative font-semibold text-white dark:text-black text-lg flex justify-center items-center mt-4">
        Pay & Checkout
      </button>
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
