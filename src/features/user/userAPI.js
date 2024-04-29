import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const getLoggedInUser = async (userId) => {
  try {
    // const url = `${BASE_URL}user`;
    const url = `http://localhost:8080/user/own/${userId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserOrders = async (user) => {
  try {
    const url = `${BASE_URL}order/my-orders`;
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${user?.jwtToken}` } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userData, user) => {
  try {
    // const url = `${BASE_URL}user/${user.id}`;
    const url = `http://localhost:8080/user/update-user`;
    const response = await axios.patch(url, userData, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user?.jwtToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getLoggedInUser, getUserOrders, updateUser };
