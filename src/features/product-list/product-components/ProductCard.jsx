import React from 'react';

const ProductCard = ({ product }) => {
  return (
    // <div key={product.id} className="bg-[#121212] h-full  cursor-pointer hover:shadow-sm hover:shadow-[#3e3e3e]">
    //   <div className="w-full">
    //     <img src={product.imageSrc} alt={product.imageAlt} className="min-h-56 max-h-60 w-full" />
    //   </div>

    //   <div className="p-2 text-base font-semibold text-white">{product.name}</div>
    //   <div className="w-full p-2 bg-[#121212] flex items-end justify-between">
    //     <div className="mt-1 text-sm text-gray-400">Black</div>
    //     <p className="text-base font-semibold text-white">{product.price}</p>
    //   </div>
    // </div>
    <div key={product.id} className="group relative bg-[#121212] rounded-md">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 max-h-76">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="p-2">
        <div>
          <h3 className="text-base font-semibold text-white">
            {/* <a href={product.href}> */}
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
            {/* </a> */}
          </h3>
          <p className="mt-1 text-sm text-white">{product.color}</p>
        </div>
        <div className="flex items-center">
          <p className="text-base font-semibold text-white">${product.price}</p>
          <p className="text-sm ml-1 font-medium text-gray-400 line-through">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
