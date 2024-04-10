import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const addItemInCart = async (item) => {
  try {
    const url = `${BASE_URL}cart`;
    const response = await axios.post(url, item);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// the below function is only defined for now. It is not yet being used anywhere. However, while fetching cart items for a particular user, we will require this function
// Add all necessary changes in cartSlice.js file while building real backend server. Also keep in mind that the cart items should be dispatched (loaded) as soon as the app is loaded. i.e dispatch the corresponding thunk action in App.js
const getItemsByUser = async (userId) => {
  try {
    const url = `${BASE_URL}cart?user=${userId}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// the below function is only defined for now. It is not yet being used anywhere. However, while updating the quantity or any data of any item in the cart, we will require this function
// Add all necessary changes in cartSlice.js fill necessary changes in carle while building real backend server.
const updateItemInCart = async (item) => {
  try {
    const url = `${BASE_URL}cart/${item.id}`;
    const response = await axios.patch(url, item);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// the below function is only defined for now. It is not yet being used anywhere. However, while deleting the item from the cart, we will require this function. Add all necessary changes in cartSlice.js fill necessary changes in carle while building real backend server.
const deleteItemFromCart = async (itemId) => {
  try {
    const url = `${BASE_URL}cart/${itemId}`;
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { addItemInCart, getItemsByUser, updateItemInCart, deleteItemFromCart };
