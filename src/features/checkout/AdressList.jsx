import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const AddressList = ({ addresses, onAddressChange, selectedAddress }) => {
  const onAddressOptionChange = (address) => {
    onAddressChange(address);
  };

  return (
    <div className="">
      <Listbox value={selectedAddress} onChange={(address) => onAddressOptionChange(address)}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
            <span className="block truncate">
              {selectedAddress ? selectedAddress : 'Choose an address from the list below'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
              {addresses?.map((address, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${active ? 'bg-primary' : ''}`
                  }
                  value={address}
                >
                  {({ selectedAddress }) => (
                    <>
                      <span className={`block truncate ${selectedAddress ? 'font-medium' : 'font-normal'}`}>
                        {address.address}
                      </span>
                      {selectedAddress ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default AddressList;
