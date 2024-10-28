<template>
<div>
    <div v-if ="product" class="grid grid-cols-5 gap-2 lg:gap-4">
      <!-- Product Image and Title -->
      <div class="grid col-span-3 gap-4 p-2 lg:p-4 grid-cols-3 items-center ">
        <!-- Image Container -->
        <div class="flex justify-center items-center ">
          <img
            :src="product.image"
            alt="product-thumb"
            class="w-14 h-14 lg:w-20 lg:h-20 object-contain cursor-pointer "
          />
        </div>
        <!-- Product Title -->
        <p class="col-span-2 text-sm lg:text-xl">{{ product.title }}</p>
      </div>

      <!-- Product Quantity and Button Controls -->
      <div
        class="grid col-span-2 grid-cols-3 gap-1 lg:gap-4 p-1 lg:p-4"
      >
        <!-- Product Quantity Controls -->
        <div class="grid col-span-2 grid-cols-1 lg:grid-cols-2">
          <!-- Total Price -->
          <div class="grid-center">
            <p class="text-center font-semibold">
              $ {{ ( product.price).toFixed(2) }}
            </p>
          </div>
        </div>

        <!-- Delete Icon and Favourite Icon-->
        <div class="grid-center gap-2 lg:grid-cols-2">
          <div class="grid-center">
            <Icon
            name="material-symbols:delete-outline-rounded"
            class="cursor-pointer text-red-300 text-2xl hover:text-red-500 "
            @click="removeFromWishList(productId)"
          />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <p v-else>Loading...</p>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
 const {productId,removeFromWishList } =  defineProps({
    productId: Number,
    removeFromWishList: Function,
  });
  
  const product = ref(null);
  
  onMounted(async () => {
    const productApi = `https://fakestoreapi.com/products/${productId}`;
    try {
      product.value = await $fetch(productApi);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  });
  </script>
  