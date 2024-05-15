import React from 'react';
import { discountedPrice } from '../../../utils/constant';

const ProductCard = ({ product }) => {
  return (
    <div
      key={product?.id}
      className="group relative bg-[#1c1c1c] rounded-md shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out border-none outline-none"
    >
      <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-60 border-none outline-none">
        <img
          src={product?.imageSrc}
          // alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-2">
        <div>
          <h3 className="text-base font-semibold text-white">
            {/* <a href={product.href}> */}
            <span aria-hidden="true" className="absolute inset-0" />
            {product?.name}
            {/* </a> */}
          </h3>
          <p className="mt-1 text-sm text-white">{product?.color}</p>
        </div>
        <div className="flex items-center">
          <p className="text-base font-semibold text-white">₹{discountedPrice(product)}</p>
          <p className=" text-sm ml-1 font-medium text-gray-400 line-through">₹{product?.price}</p>
          <small className="text-xs font-semibold ml-1 text-primary">{product?.discountPercentage}% Off</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
