import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const addItemInWishlist = async (item, user) => {
  try {
    const url = `${BASE_URL}wishlist/add-item`;
    const response = await axios.post(url, item, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const getWishlistedItemsByUser = async (user) => {
  try {
    const url = `${BASE_URL}wishlist`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const deleteItemFromWishlist = async (itemId, user) => {
  try {
    const url = `${BASE_URL}wishlist/delete-item/${itemId}`;
    const response = await axios.delete(url, {
      headers: { Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { addItemInWishlist, getWishlistedItemsByUser, deleteItemFromWishlist };
