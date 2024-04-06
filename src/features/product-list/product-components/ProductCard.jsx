import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="group relative bg-[#121212] cursor-pointer hover:shadow-sm hover:shadow-[#3e3e3e]">
      <div className="aspect-h-1 aspect-w-1 px-2 w-full overflow-hidden  lg:h-80">
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
