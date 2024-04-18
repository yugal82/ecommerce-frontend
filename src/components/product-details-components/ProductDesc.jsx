import React from 'react';

const ProductDesc = ({ product }) => {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-2 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{product?.name}</h1>
      </div>

      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-8 lg:pr-8 lg:pt-6">
        {/* Description and details */}
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-base text-white">{product?.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-medium text-white">Highlights</h3>

          <div className="mt-4">
            <ul className="list-disc space-y-2 pl-4 text-sm">
              {product?.highlights?.map((highlight) => (
                <li key={highlight} className="text-gray-400">
                  <span className="text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-medium text-white">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-300">{product?.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;
