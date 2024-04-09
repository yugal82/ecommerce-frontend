import axios from 'axios';

const createUser = async (userData) => {
  try {
    console.log(userData);
    const url = 'http://localhost:8080/users';
    const response = await axios.post(url, {
      method: 'POST',
      body: { email: userData.email, password: userData.password },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
