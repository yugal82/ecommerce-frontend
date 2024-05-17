import axios from 'axios';
import { BASE_URL } from '../../utils/constant';
// const getAllProducts = async () => {
//   try {
//     const url = 'http://localhost:8080/products';
//     const response = await axios.get(url);
//     return response;
//   } catch (error) {
//     return error.message
//   }
// };

const getProductsByFilters = async (filters) => {
  try {
    // filter = {"category": "smartphone"}
    // currently we only support one query at a time. TODO: while implementing the backend, we should be able to add multiple filters.
    let queryString = '';
    console.log(filters);
    for (let key in filters) {
      queryString += `${key}=${filters[key]}&`;
    }
    const url = `${BASE_URL}product?` + queryString;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const getProductsBySortFilter = async (sortFilter) => {
  try {
    const url = `${BASE_URL}product?sort=${sortFilter?.sort}&order=${sortFilter?.order}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const createProduct = async (product) => {
  try {
    const url = `${BASE_URL}product/create-product`;
    const response = await axios.post(url, product, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    return error.message;
  }
};

const deleteProduct = async (product) => {
  try {
    const url = `${BASE_URL}product/${product.id}`;
    const response = await axios.patch(url, product, { headers: { 'Content-Type': 'application/json' } });
    return response;
  } catch (error) {
    return error.message;
  }
};

export { getProductsByFilters, getProductsBySortFilter, createProduct, deleteProduct };
