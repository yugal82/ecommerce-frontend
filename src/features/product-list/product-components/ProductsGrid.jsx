import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const ProductsGrid = ({ products }) => {
  return (
    /* Product grid */
    <div className="w-full lg:col-span-3">
      <div className="">
        <div className="px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {products.map((product, idx) => (
              <Link key={idx} to="/product-details">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
