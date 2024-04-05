import React from 'react';

const ProductsGrid = ({ products }) => {
  return (
    /* Product grid */
    <div className="w-full lg:col-span-3">
      <div className="">
        <div className="px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-[#121212] py-2 rounded-xl cursor-pointer hover:shadow-sm hover:shadow-[#3e3e3e]"
              >
                <div className="aspect-h-1 aspect-w-1 px-2 w-full overflow-hidden rounded-md  lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 px-2 bg-[#121212]">
                  <div className="w-full flex items-center justify-between">
                    <p className="text-base font-semibold text-white">{product.name}</p>
                    <p className="text-base font-semibold text-white">{product.price}</p>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{product.color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
