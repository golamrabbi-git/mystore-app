<template>
  <h1 class="text-2xl text-center text-green-600 my-4">Shopping Cart</h1>
  <div class=" ">
    <div
      class="hidden lg:grid grid-cols-6 gap-4 p-4 border border-green-600 bg-green-50 rounded-xl mb-2"
    >
      <!-- Item Name Column (spans 3 columns) -->
      <p class="grid items-center col-span-3 font-bold justify-center text-xl">
        Item
      </p>
      <!-- Divider between Item and Quantity -->
      <p
        class="font-bold grid items-center justify-center border-l-2 border-green-500 text-xl"
      >
        Quantity
      </p>
      <!-- Divider between Quantity and Total Price -->
      <p
        class="font-bold grid items-center justify-center border-l-2 border-green-500 text-xl"
      >
        Total Price
      </p>
      <!-- Divider between Total Price and Buttons-->
      <p
        class="font-bold grid items-center justify-center border-l-2 border-green-500 text-xl"
      >
        Actions
      </p>
    </div>
    <div class="flex flex-col gap-3 mb-4">
      <div
        class="border border-green-600 rounded-xl"
        v-for="(productQuantity, productId) in cartStore.cart"
        :key="productId"
      >
        <!-- Pass productId and productQuantity to CartCard component -->
        <CartCard
          :productId="productId"
          :productQuantity="productQuantity"
          :removeFromCart="cartStore.removeFromLocalStorage"
          :increaseQuantityByOne="cartStore.increaseProductQuantity"
          :decreaseQuantityByOne="cartStore.decreaseProductQuantity"
          :addToFavouriteList = "favouriteStore.addFavouriteToDB"
        />
      </div>
    </div>
    <p class="text-center text-2xl text-green-600">Order Summary</p>
    <div
      class="border border-green-600 rounded-xl mt-4 p-2 lg:p-4 lg:flex justify-around bg-gray-100"
    >
    <div>
      <Coupon />
    </div>
      <div class="border border-green-600 p-2 mt-2 lg:m-0 lg:p-4 rounded-md bg-green-50">
        <OrderSummary/>
      </div>
    </div>
  </div>
</template>

<script setup>
import CartCard from "~/components/cartCard.vue";
import { useCartStore } from "~/stores/cartStore";
import { useFavouriteStore } from "~/stores/favoriteStore";
// Initialize cartStore
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore();
</script>

<style scoped></style>
