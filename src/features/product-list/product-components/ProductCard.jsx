import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="bg-[#121212] cursor-pointer hover:shadow-sm hover:shadow-[#3e3e3e] rounded-xl">
      <div className="w-full lg:h-76">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="py-3 px-2 bg-[#121212]">
        <div className="w-full flex items-center justify-between">
          <p className="text-base font-semibold text-white">{product.name}</p>
          <p className="text-base font-semibold text-white">{product.price}</p>
        </div>
        <div className="mt-1 text-sm text-gray-400">{product.color}</div>
      </div>
    </div>
  );
};

export default ProductCard;
