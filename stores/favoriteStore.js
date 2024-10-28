import {addFavouriteToDB, getFavoriteList, removeFromList} from '~/composable/addToWishList';

export const useFavouriteStore = defineStore('favouriteStore', {
  state: () => ({
    favouriteList: [],
  }),

  getters: {
    // Return the number of items in the cart
    favouriteListCountItem: (state) => {
      return (state.favouriteList).length;
    },
  },

  actions: {
    // Action to get cart data from localStorage and update the store's state
    async getWishListFromLocalStorage() {
      this.favouriteList = getFavoriteList();
    },


    // Action to add an item to the cart and update localStorage
    addFavouriteToDB(itemId) {
        addFavouriteToDB(itemId);  
      this.favouriteList = getFavoriteList(); 
    },

    //Action to remove an item from the localstorage
    removeFromWishList(itemId) {
        removeFromList(itemId);
      this.favouriteList = getFavoriteList()
    },
  },

});
