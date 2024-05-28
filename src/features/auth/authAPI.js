import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
const createUser = async (userData) => {
  try {
    const url = `${BASE_URL}user/signup`;
    const response = await axios.post(url, userData, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    return error.message;
  }
};

// function for login is not yet implemented. but will be added in the future.
const login = async (loginInfo) => {
  try {
    const url = `${BASE_URL}user/login`;
    const response = await axios.post(url, loginInfo, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const checkAuth = async (user) => {
  try {
    const url = `${BASE_URL}user/check`;
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${user?.jwtToken}` } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const logout = async () => {
  try {
    const url = `${BASE_URL}user/logout`;
    const response = await axios.get(url);
    if (response.status === 200) return response.status;
    else throw new Error("Couldn't log out");
  } catch (error) {
    return error.message;
  }
};

export { createUser, login, logout, checkAuth };
