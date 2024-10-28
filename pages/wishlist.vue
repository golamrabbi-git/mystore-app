<template>
    <div>
        <p class="text-center text-2xl text-green-600 mb-4">Favourite Product Lists</p>
      <div class="flex flex-col gap-3 mb-4">
        <div class="border border-green-600 rounded-xl" v-for="productId in favoriteStore.favouriteList" :key="productId">
        <WishListCard
          :productId="productId"
          :removeFromWishList="favoriteStore.removeFromWishList"
        />
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useFavouriteStore } from "~/stores/favoriteStore";
  const favoriteStore = useFavouriteStore();
  </script>
  