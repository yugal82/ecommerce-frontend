import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const createOrder = async (order) => {
  try {
    // const url = `${BASE_URL}order`;
    const url = `http://localhost:8080/order/create-order`;
    const response = await axios.post(url, order, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  try {
    // const url = `${BASE_URL}order`;
    const url = `http://localhost:8080/order`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (order) => {
  try {
    const url = `http://localhost:8080/order/update-order/${order.id}`;
    const response = await axios.patch(url, order, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { createOrder, getAllOrders, updateOrder };
