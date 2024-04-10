import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';
const createUser = async (userData) => {
  try {
    console.log(userData);
    const url = `${BASE_URL}users`;
    const response = await axios.post(url, { email: userData.email, password: userData.password });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
