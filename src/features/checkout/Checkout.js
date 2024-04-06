import React from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Cart from '../cart/Cart';
import Payment from './Payment';
import InputField from './InputField';
import AddressList from './AdressList';

const Checkout = () => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className="lg:col-span-3 mt-8">
        <form>
          <div className="w-full px-8">
            <div className="border-b border-white pb-12">
              <h2 className="text-lg font-medium text-white">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                Use a permanent address where you can receive the product.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                <InputField
                  label="First name"
                  inputType="text"
                  name="first-name"
                  id="first-name"
                  divClass="sm:col-span-3"
                  autoComplete="given-name"
                />
                <InputField
                  label="Last name"
                  inputType="text"
                  name="last-name"
                  id="last-name"
                  divClass="sm:col-span-3"
                  autoComplete="family-name"
                />
                <InputField
                  label="Email Address"
                  inputType="email"
                  name="email"
                  id="email"
                  divClass="sm:col-span-4"
                  autoComplete="email"
                />

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-white">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <InputField
                  label="Street address"
                  inputType="text"
                  name="street-address"
                  id="street-address"
                  divClass="col-span-full"
                  autoComplete="street-address"
                />
                <InputField
                  label="City"
                  inputType="text"
                  name="city"
                  id="city"
                  divClass="sm:col-span-2 sm:col-start-1"
                  autoComplete="address-level2"
                />
                <InputField
                  label="State / Province"
                  inputType="text"
                  name="region"
                  id="region"
                  divClass="sm:col-span-2"
                  autoComplete="address-level1"
                />
                <InputField
                  label="ZIP / Postal code"
                  inputType="text"
                  name="postal-code"
                  id="postal-code"
                  divClass="sm:col-span-2"
                  autoComplete="postal-code"
                />
              </div>
            </div>

            <div className="mt-4 pb-12">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">Address</h2>
                <p className="mt-1 text-sm leading-6 text-gray-300">Choose from previously used address.</p>
                <AddressList />
              </div>
              <div className="mt-10 space-y-10">
                <Payment />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="lg:col-span-2">
        <Cart />
      </div>
    </div>
  );
};

export default Checkout;
