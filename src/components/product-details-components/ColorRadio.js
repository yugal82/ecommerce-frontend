import React from 'react';
import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ColorRadio = ({ selectedColor, setSelectedColor, product }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-white">Color</h3>

      <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {product?.colors?.map((color) => (
            <RadioGroup.Option
              key={color.name}
              value={color}
              className={({ active, checked }) =>
                classNames(
                  color.selectedClass,
                  active && checked ? 'ring ring-primary ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {color.name}
              </RadioGroup.Label>
              <span aria-hidden="true" className={classNames(color.class, 'h-8 w-8 rounded-full')} />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ColorRadio;
