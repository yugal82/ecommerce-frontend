import axios from 'axios';

// const getAllProducts = async () => {
//   try {
//     const url = 'http://localhost:8080/products';
//     const response = await axios.get(url);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getProductsByFilters = async (filters) => {
  try {
    // filter = {"category": "smartphone"}
    // currently we only support one query at a time. TODO: while implementing the backend, we should be able to add multiple filters.
    let queryString = '';
    for (let key in filters) {
      queryString += `${key}=${filters[key]}&`;
    }
    const url = `http://localhost:8080/products?` + queryString;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getProductsBySortFilter = async (sortFilter) => {
  try {
    const url = `http://localhost:8080/products?_sort=${sortFilter?.sort}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getProductsByFilters, getProductsBySortFilter };
