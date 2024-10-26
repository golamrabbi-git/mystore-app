<template>
    <div>
        <div class="border border-green-600 p-2 lg:p-4 rounded-md bg-green-50">
            <p class="text-green-600 text-lg mb-2">Do you have any coupon code?</p>
            <div class="coupon-container">
                <input
                    type="text"
                    class="text h-10 border border-green-500 rounded-md p-2 outline-none"
                    placeholder="Enter Coupon Code"
                    v-model="couponCodeRef"
                />
                <button
                    @click="applyCoupon"
                    class="ml-2 bg-green-500 text-white rounded-md px-4 h-10 hover:bg-green-600"
                >
                    Apply
                </button>
                <p v-if="message" class="text-red-500">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCouponStore } from "~/stores/couponStore";

const couponStore = useCouponStore();
// Using ref for the input coupon code and message display
const couponCodeRef = ref("");
const message = ref("");

const applyCoupon = () =>{
    const res = couponStore.applyCoupon(couponCodeRef.value);
    message.value = res.message;
    setTimeout(() => { message.value = ""; }, 3000);
}

</script>

<style  scoped>

</style>
