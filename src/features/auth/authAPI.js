import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';
const createUser = async (userData) => {
  try {
    const url = `${BASE_URL}user`;
    const response = await axios.post(url, userData, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// function for login is not yet implemented. but will be added in the future.
const login = async (loginInfo) => {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const url = `${BASE_URL}user?email=${email}`;
    const response = await axios.get(url);
    if (response.data.length > 0) {
      if (password === response.data[0].password) {
        return response.data[0];
      } else {
        throw new Error('Wrong Credentials');
      }
    } else {
      throw new Error('User not found');
    }
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
