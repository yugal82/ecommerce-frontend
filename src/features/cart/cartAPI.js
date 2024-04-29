import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const addItemInCart = async (item, user) => {
  try {
    const url = `${BASE_URL}cart/add-item`;
    const response = await axios.post(url, item, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// the below function is only defined for now. It is not yet being used anywhere. However, while fetching cart items for a particular user, we will require this function
// Add all necessary changes in cartSlice.js file while building real backend server. Also keep in mind that the cart items should be dispatched (loaded) as soon as the app is loaded. i.e dispatch the corresponding thunk action in App.js
const getItemsByUser = async (user) => {
  try {
    const url = `${BASE_URL}cart/cart-items`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user?.jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateItemInCart = async (item, user) => {
  try {
    // const url = `${BASE_URL}cart/${item.id}`;
    const url = `${BASE_URL}cart/update-item/${item.id}`;
    const response = await axios.patch(url, item, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteItemFromCart = async (itemId, user) => {
  try {
    const url = `${BASE_URL}cart/delete-item/${itemId}`;
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${user?.jwtToken}` } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const resetCart = async (user) => {
  try {
    const response = await getItemsByUser(user);
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id, user);
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export { addItemInCart, getItemsByUser, updateItemInCart, deleteItemFromCart, resetCart };
