import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const addItemInWishlist = async (item) => {
  try {
    const url = `${BASE_URL}wishlist/add-item`;
    const response = await axios.post(url, item);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getWishlistedItemsByUser = async () => {
  try {
    const url = `${BASE_URL}wishlist/`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteItemFromWishlist = async (itemId) => {
  try {
    const url = `${BASE_URL}wishlist/delete-item/${itemId}`;
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { addItemInWishlist, getWishlistedItemsByUser, deleteItemFromWishlist };
