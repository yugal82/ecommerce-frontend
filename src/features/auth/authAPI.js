import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';
const createUser = async (userData) => {
  try {
    // const url = `${BASE_URL}user/signup`;
    const url = `http://localhost:8080/user/signup`;
    const response = await axios.post(url, userData, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// function for login is not yet implemented. but will be added in the future.
const login = async (loginInfo) => {
  try {
    // const url = `${BASE_URL}user?email=${email}`;
    const url = `http://localhost:8080/user/login`;
    const response = await axios.post(url, loginInfo, { headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const logout = async (user) => {
  // here we need to take care of sessions using real backend server. Now as it is a dummy json server, we just resolve the Promise created here and send a 'user logged out' message.
  return new Promise((resolve, reject) => {
    resolve({ msg: 'user logged out' });
  });
};

export { createUser, login, logout };
