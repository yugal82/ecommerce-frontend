import React from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SizesRadio = ({ selectedSize, setSelectedSize, product }) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Size</h3>
        {/* <span className="text-sm font-medium text-primary">Size guide</span> */}
      </div>

      <RadioGroup value={selectedSize} onChange={(index) => setSelectedSize(index)} className="mt-4">
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {product?.sizes?.map((size) => (
            <RadioGroup.Option
              key={size}
              value={size}
              className={({ active }) =>
                classNames(
                  'cursor-pointer bg-white text-primary shadow-sm group relative flex items-center justify-center rounded-md text-sm font-medium uppercase sm:flex-1'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label
                    as="span"
                    className={`w-full py-3 px-4  sm:py-6 outline-none text-center rounded-md ${
                      checked ? 'text-white bg-primary' : 'text-primary'
                    }`}
                  >
                    {size}
                  </RadioGroup.Label>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default SizesRadio;
