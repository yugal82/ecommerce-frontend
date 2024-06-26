import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const getLoggedInUser = async (userId) => {
  try {
    // const url = `${BASE_URL}user`;
    const url = `${BASE_URL}user/own/${userId}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const getUserOrders = async (user) => {
  try {
    const url = `${BASE_URL}order/my-orders`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const updateUser = async (userData, user) => {
  try {
    // const url = `${BASE_URL}user/${user.id}`;
    const url = `${BASE_URL}user/update-user`;
    const response = await axios.patch(url, userData, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { getLoggedInUser, getUserOrders, updateUser };
