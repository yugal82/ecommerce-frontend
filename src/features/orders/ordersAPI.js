import axios from 'axios';
import { BASE_URL } from '../../utils/constant';

const createOrder = async (order, user) => {
  try {
    const url = `${BASE_URL}order/create-order`;
    const response = await axios.post(url, order, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

const getAllOrders = async (user) => {
  try {
    const url = `${BASE_URL}order`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const updateOrder = async (order, user) => {
  try {
    const url = `${BASE_URL}order/update-order/${order.id}`;
    const response = await axios.patch(url, order, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { createOrder, getAllOrders, updateOrder };
