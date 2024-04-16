import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';

const getLoggedInUser = async (user) => {
  try {
    const url = `${BASE_URL}user/${user.id}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserOrders = async (user) => {
  try {
    const url = `${BASE_URL}order?user.id=${user.id}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user) => {
  try {
    const url = `${BASE_URL}user/${user.id}`;
    // const url = `${BASE_URL}user/update-user/${user.id}`;
    const response = await axios.patch(url, user, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getLoggedInUser, getUserOrders, updateUser };
