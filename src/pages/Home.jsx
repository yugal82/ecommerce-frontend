import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../features/product-list/ProductList';

const Home = () => {
  return (
    <>
      <Navbar />
      <ProductList />
    </>
  );
};

export default Home;
