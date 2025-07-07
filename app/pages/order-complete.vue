<template>
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
        <div class="bg-green-500/20 dark:bg-green-700/20 flex rounded-full p-4 mb-4">
            <UIcon name="i-iconamoon-check-circle-1-fill" size="48"
                class="text-[#23a26d] dark:text-[#40d195] shadow-md" />
        </div>
        <h1 class="text-2xl font-bold mb-2">Thank you for your order!</h1>
        <p class="text-lg text-neutral-600 dark:text-neutral-300 mb-4">Your payment was successful and your order is
            being processed.</p>
        <NuxtLink to="/"
            class="mt-4 px-6 py-2 rounded-full bg-alizarin-crimson-700 text-white font-semibold hover:bg-alizarin-crimson-600 transition">
            Back to Home</NuxtLink>
    </div>
</template>

<script setup>
// Ensure cart is empty on this page
const { cart } = useCart();
cart.value = [];
localStorage.setItem('cart', JSON.stringify([]));
</script>
