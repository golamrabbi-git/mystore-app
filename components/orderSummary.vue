<template>
    <div class="lg:px-20 lg:py-2">
      <div>
        <p>Original Price: {{ originalPrice }} USD</p>
        <p>Discount: {{ savings }} USD</p>
        <p>Store Pickup: {{ storPickup }} USD</p>
        <p>Tax: {{ tax }} USD</p>
        <p class="border border-green-500"></p>
        <p>Grand Total: {{ grandTotal }} USD</p>
      </div>
      <div class="mt-2">
        <div class="p-2 text-white text-center rounded-md bg-green-500 mt-1 cursor-pointer hover:bg-green-600">
          <NuxtLink to='/demo'>Proceed to Order</NuxtLink>
        </div>
        <div class="flex flex-col justify-center mt-1">
          <p class="text-center">Or</p>
          <NuxtLink to="/products" class="hover:text-[#42b883] underline text-green-500 text-center"
              >Continue Shopping</NuxtLink
            >
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch, watchEffect } from "vue";
  import { useCartStore } from "~/stores/cartStore";
  import { useCouponStore } from "~/stores/couponStore";
  
  const res = ref([]);
  const cartStore = useCartStore();
  const couponStore = useCouponStore();
  const isLoading = ref(true);
  const storPickup = ref(10);
  
  const discount = ref(0);
  
  // Watch the changes in couponStore for applied discount
  watchEffect(() => {
    if (couponStore.isCouponApplied) {
      discount.value = couponStore.couponCode.discount;
    } else {
      discount.value = 0;
    }
  });
  
  // Function to fetch product details 
  const fetchProductData = async () => {
    isLoading.value = true;
    res.value = [];
  
    const fetchPromises = Object.keys(cartStore.cart).map(async (productId) => {
      const productApi = `https://fakestoreapi.com/products/${productId}`;
      try {
        const product = await $fetch(productApi);
        res.value.push({ ...product, quantity: cartStore.cart[productId] });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    });
  
    await Promise.all(fetchPromises);
    isLoading.value = false;
  };
  
  onMounted(fetchProductData);
  
  // Watch for changes in cartStore
  watch(
    () => cartStore.cart,
    async () => {
      await fetchProductData();
    },
    { deep: true }
  );
  
  // Calculate the original price based on items in the cart
  const originalPrice = computed(() => {
    return res.value.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0).toFixed(2);
  });
  
  // Calculate savings based on the discount
  const savings = computed(() => {
    return (originalPrice.value * (discount.value / 100)).toFixed(2);
  });
  
  // Calculate tax based on the original price
  const tax = computed(() => {
    return (originalPrice.value * 0.1).toFixed(2); // 10% tax
  });
  
  // Calculate the total price after applying discount and adding tax
  const totalPriceAfterDiscount = computed(() => {
    return (originalPrice.value - savings.value + parseFloat(tax.value)).toFixed(2);
  });
  
  // Calculate the grand total including store pickup
  const grandTotal = computed(() => {
    return (parseFloat(totalPriceAfterDiscount.value) + parseFloat(storPickup.value)).toFixed(2);
  });
  
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  