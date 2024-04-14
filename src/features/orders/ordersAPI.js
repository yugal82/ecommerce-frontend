import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const createOrder = async (order) => {
  try {
    const url = `${BASE_URL}order/create-order`;
    const response = await axios.post(url, order);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createOrder };
