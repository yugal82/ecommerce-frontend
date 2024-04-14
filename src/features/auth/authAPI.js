import axios from 'axios';
const BASE_URL = 'http://localhost:8080/';
const createUser = async (userData) => {
  try {
    const url = `${BASE_URL}users`;
    const response = await axios.post(
      url,
      { email: userData.email, password: userData.password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// function for login is not yet implemented. but will be added in the future.

const updateUser = async (user) => {
  try {
    const url = `${BASE_URL}user/update-user/${user.id}`;
    const response = await axios.patch(url, user, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { createUser, updateUser };
