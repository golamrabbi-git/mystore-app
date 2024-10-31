<template>
  <!-- Responsive Navbar -->
  <div class="w-full">
    <div class="w-full">
      <div
        class="lg:hidden flex justify-between w-full p-4 bg-white shadow-md z-50"
      >
        <div>
          <NuxtLink to="/" class="font-bold text-2xl text-[#42b883]" >
            My Store
          </NuxtLink>
        </div>
        <div class="flex justify-center items-center rounded-md size-10 border">
          <Icon
            :name="isToggle ? 'gridicons:cross' : 'heroicons-solid:bars-3'"
            class="text-[#42b883] text-2xl cursor-pointer "
            @click="toggleNav"
          />
        </div>
      </div>

      <!-- Dropdown menu -->
      <div
        v-if="isToggle"
        class="absolute bg-white w-full p-4 shadow-lg rounded-md z-40"
      >
        <ul class="text-xl">
          <li class="nav-link mb-2">
            <NuxtLink to="/products" class="hover:text-[#42b883]" @click ="toggleNav"
              >Products</NuxtLink
            >
          </li>
          <li class="nav-link mb-2">
            <NuxtLink to="/about" class="hover:text-[#42b883] " @click ="toggleNav">About</NuxtLink>
          </li>
        </ul>
        <NuxtLink
          to="/cart"
          class="flex items-center text-xl mt-2 hover:text-[#42b883]"  @click ="toggleNav"
        >
          <span>Cart</span>
        </NuxtLink>
        <NuxtLink
          to="/wishlist"
          class="flex items-center text-xl mt-2 hover:text-[#42b883]"  @click ="toggleNav"
        >
          <span>Wishlist</span>
        </NuxtLink>
        <div
          class="w-full mt-4 px-2 py-1 bg-[#42b883] rounded-md text-white text-center hover:bg-[#297d58] transition duration-300"
        >
          <NuxtLink to="/login" class="text-xl"> Login </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Desktop Navbar -->
    <div class="hidden lg:block">
      <header class="shadow-md bg-white fixed top-0 left-0 w-full">
        <nav class="flex justify-between container mx-auto p-4 items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="font-bold text-3xl text-[#42b883]"
            >My Store</NuxtLink
          >
          <!-- Nav Links -->
          <ul class="flex gap-4 text-2xl">
            <li class="nav-link"><NuxtLink to="/">Home</NuxtLink></li>
            <li class="nav-link">
              <NuxtLink to="/products">Products</NuxtLink>
            </li>
            <li class="nav-link"><NuxtLink to="/about">About</NuxtLink></li>
          </ul>
          <div class="flex gap-4 items-center relative">
            <div class="relative">
              <!-- WishList Badge -->
              <span
                class="bg-[#42b883] text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                >{{ favoriteStore.favouriteListCountItem }}</span
              >
              <!-- Wishlist Icon -->
              <NuxtLink
                to="/wishlist"
                class="flex items-center text-2xl text-[#42b883]"
              >
                <Icon name="carbon:favorite" class="hover:text-[#26674a]" />
              </NuxtLink>
            </div>
            <div class="relative">
              <!-- Cart Badge -->
              <span
                class="bg-[#42b883] text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                >{{ cartStore.cartItemCount }}</span
              >
              <!-- Cart Icon -->
              <NuxtLink
                to="/cart"
                class="flex items-center text-2xl text-[#42b883]"
              >
                <Icon name="bi:bag-plus" class="hover:text-[#26674a]" />
              </NuxtLink>
            </div>
            <!-- Login Button -->
            <NuxtLink to="/login" class="btn"> Login </NuxtLink>
          </div>
        </nav>
      </header>
    </div>
  </div>

  <!-- Slot -->
  <div class="container mx-auto p-4 items-center lg:mt-16">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "~/stores/cartStore";
import { useFavouriteStore } from "~/stores/favoriteStore";

const isToggle = ref(false);
const cartStore = useCartStore();
const favoriteStore = useFavouriteStore();
onMounted(() => {
  cartStore.getCartDataFromLocalStorage(); // Load cart data from localStorage on refresh
});
onMounted(() => {
  favoriteStore.getWishListFromLocalStorage(); // Load cart data from localStorage on refresh
});

const toggleNav = () => {
  isToggle.value = !isToggle.value;
};
</script>

<style scoped>
.router-link-active {
  color: #42b883;
}
.router-link-active:hover {
  border-bottom: #42b883;
}
ul a {
  text-decoration: none;
}
</style>
