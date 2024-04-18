import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const createOrder = async (order) => {
  try {
    // const url = `${BASE_URL}order/create-order`;
    const url = `${BASE_URL}order`;
    const response = await axios.post(url, order);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  try {
    const url = `${BASE_URL}order`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (order) => {
  try {
    const url = `${BASE_URL}order/${order.id}`;
    const response = await axios.patch(url, order, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createOrder, getAllOrders, updateOrder };
