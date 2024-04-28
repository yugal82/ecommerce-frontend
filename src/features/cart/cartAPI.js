import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const addItemInCart = async (item) => {
  try {
    // const url = `${BASE_URL}cart`;
    const url = `http://localhost:8080/cart/add-item`;
    const response = await axios.post(url, item);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// the below function is only defined for now. It is not yet being used anywhere. However, while fetching cart items for a particular user, we will require this function
// Add all necessary changes in cartSlice.js file while building real backend server. Also keep in mind that the cart items should be dispatched (loaded) as soon as the app is loaded. i.e dispatch the corresponding thunk action in App.js
const getItemsByUser = async () => {
  try {
    // const url = `${BASE_URL}cart`;
    const url = `http://localhost:8080/cart/cart-items`;
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateItemInCart = async (item) => {
  try {
    // const url = `${BASE_URL}cart/${item.id}`;
    const url = `http://localhost:8080/cart/update-item/${item.id}`;
    const response = await axios.patch(url, item);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteItemFromCart = async (itemId) => {
  try {
    // const url = `${BASE_URL}cart/${itemId}`;
    const url = `http://localhost:8080/cart/delete-item/${itemId}`;
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const resetCart = async () => {
  try {
    const response = await getItemsByUser();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
  } catch (error) {
    console.log(error);
  }
};

export { addItemInCart, getItemsByUser, updateItemInCart, deleteItemFromCart, resetCart };
