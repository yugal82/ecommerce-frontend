import React from 'react';

const AddressForm = ({ register }) => {
  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('name')}
              id="name"
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
            Phone
          </label>
          <div className="mt-2">
            <input
              type="tel"
              {...register('phone')}
              id="phone"
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="street" className="block text-sm font-medium leading-6 text-white">
            Street address
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('street', {
                required: 'street is required',
              })}
              id="street"
              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('city', {
                required: 'city is required',
              })}
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="state" className="block text-sm font-medium leading-6 text-white">
            State / Province
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('state', {
                required: 'state is required',
              })}
              id="state"
              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-white">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('pinCode', {
                required: 'pinCode is required',
              })}
              id="pinCode"
              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end">
        <button
          type="reset"
          className="rounded-md border border-transparent bg-white px-6 py-2 text-base font-semibold text-primary shadow-sm mr-2"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-primary px-6 py-2 text-base font-semibold text-white shadow-sm"
        >
          Add Address
        </button>
      </div>
    </>
  );
};

export default AddressForm;
