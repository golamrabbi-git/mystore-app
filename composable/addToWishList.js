// Function to add an item to the shopping cart
const addFavouriteToDB = (id) => {
    if (process.client) { // Ensures code runs only on the client-side
        try {
            const favoriteList = localStorage.getItem("favorite-list");
            const favouriteProducts = favoriteList ? JSON.parse(favoriteList) : [];

            if (!favouriteProducts.includes(id)) {
                favouriteProducts.push(id);
            }

            // Store the updated favorites list back in local storage
            localStorage.setItem("favorite-list", JSON.stringify(favouriteProducts));
        } catch (error) {
            console.error("Error adding to the favorite list:", error);
        }
    }
};

  
// Function to retrieve the shopping cart from local storage
const getFavoriteList = () => {
  if (process.client) {
    try {
      const favoriteList = localStorage.getItem("favorite-list");
      if (favoriteList) {
        return JSON.parse(favoriteList);
      }
    } catch (error) {
      console.error("Error retrieving the Favorite list:", error);
    }
  }
  return [];
};

const removeFromList = (id) => {
  if (process.client) {
    try {
      const favoriteList = localStorage.getItem("favorite-list");
      if (favoriteList) {
        const favouriteProducts = JSON.parse(favoriteList);
        if (favouriteProducts.includes(id)) {
            const newFavList = favouriteProducts.filter(item => item !== id);
          localStorage.setItem("favorite-list",JSON.stringify(newFavList));
        }
      }
    } catch (error) {
      console.error("Error retrieving the shopping cart:", error);
    }
  }
};

export { addFavouriteToDB, getFavoriteList, removeFromList };
