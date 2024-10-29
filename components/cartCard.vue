<template>
  <div>
    <div v-if="res" class="grid grid-cols-6 gap-2 lg:gap-4">
      <!-- Product Image and Title -->
      <div class="grid col-span-3 gap-4 p-2 lg:p-4 grid-cols-3 items-center">
        <!-- Image Container -->
        <div class="flex justify-center items-center">
          <img
            :src="res.image"
            alt="product-thumb"
            class="w-14 h-14 lg:w-20 lg:h-20 object-contain cursor-pointer"
          />
        </div>
        <!-- Product Title -->
        <p class="col-span-2 text-sm lg:text-xl">{{ res.title }}</p>
      </div>

      <!-- Product Quantityn and Button Controls -->
      <div class="grid col-span-3 grid-cols-3 gap-1 lg:gap-4 p-1 lg:p-4">
        <!-- Product Quantity Controls -->
        <div class="grid col-span-2 grid-cols-1 lg:grid-cols-2">
          <div class="flex-center">
            <!-- Decrement Button -->
            <span
              @click="
                productQuantity > 1 ? decreaseQuantityByOne(productId) : null
              "
              :class="{
                'opacity-50 cursor-not-allowed': productQuantity === 1,
              }"
              class="incDec-btn"
              >-</span
            >

            <!-- Quantity Display -->
            <span class="px-4 font-bold lg:text-2xl">{{
              productQuantity
            }}</span>

            <!-- Increment Button -->
            <span @click="increaseQuantityByOne(productId)" class="incDec-btn"
              >+</span
            >
          </div>

          <!-- Total Price -->
          <div class="grid-center">
            <p class="text-center font-semibold">
              $ {{ (productQuantity * res.price).toFixed(2) }}
            </p>
          </div>
        </div>

        <!-- Delete Icon and Favourite Icon-->
        <div class="grid-center gap-2 lg:grid-cols-2">
          <div class="grid-center">
            <Icon
              name="material-symbols:favorite-rounded"
              :class="[
                'cursor-pointer text-2xl hover:text-green-500',
                isItemAvailableInTheFavList(res.id)
                  ? 'text-green-500'
                  : 'text-green-300',
              ]"
              @click="addToFavouriteList(res.id)"
            />
          </div>
          <div class="grid-center">
            <Icon
              name="material-symbols:delete-outline-rounded"
              class="cursor-pointer text-red-300 text-2xl hover:text-red-500"
              @click="removeFromCart(productId)"
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
import { useFavouriteStore } from "~/stores/favoriteStore";
const favoriteStore = useFavouriteStore();
// Define props
const {
  productId,
  productQuantity,
  removeFromCart,
  increaseQuantityByOne,
  decreaseQuantityByOne,
} = defineProps({
  // res: Object,
  productId: [String, Number],
  productQuantity: Number,
  removeFromCart: Function,
  increaseQuantityByOne: Function,
  decreaseQuantityByOne: Function,
  addToFavouriteList: Function,
});

// console.log(res);

//Create a reactive variable to hold API response
const res = ref(null);

onMounted(async () => {
  const productApi = `https://fakestoreapi.com/products/${productId}`;
  try {
    // Fetch product details from the API
    res.value = await $fetch(productApi);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});

const isItemAvailableInTheFavList = (id) => {
  return favoriteStore.favouriteList.includes(id);
};
</script>

<style scoped></style>
