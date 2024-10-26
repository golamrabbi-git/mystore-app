
export const useCouponStore = defineStore('couponStore', {
    state: () => ({
        couponCode: { code: "Demo", discount: 10 },
        isCouponApplied: false,
      }),
    
      getters: {
        // Get discount for a given coupon code
        getDiscount: (state) => (inputCode) => {
          return state.couponCode.code === inputCode ? state.couponCode.discount : 0;
        }
      },

  actions: {
    // Action to get cart data from localStorage and update the store's state

    // Action to validate the entered coupon code
       applyCoupon(inputCode) {
        if (inputCode === this.couponCode.code) {
          this.isCouponApplied = true;
          return { success: true, discount: this.couponCode.discount, message: `Coupon "${inputCode}" applied Successfully!`};
        } else {
          return { success: false, message: `Coupon "${inputCode}" is invalid!` };
        }
      }
  },

});
