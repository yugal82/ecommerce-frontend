import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const addItemInWishlist = async (item, user) => {
  try {
    const url = `${BASE_URL}wishlist/add-item`;
    const response = await axios.post(url, item, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getWishlistedItemsByUser = async (user) => {
  try {
    const url = `${BASE_URL}wishlist`;
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${user?.jwtToken}` } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteItemFromWishlist = async (itemId, user) => {
  try {
    const url = `${BASE_URL}wishlist/delete-item/${itemId}`;
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${user?.jwtToken}` } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { addItemInWishlist, getWishlistedItemsByUser, deleteItemFromWishlist };
