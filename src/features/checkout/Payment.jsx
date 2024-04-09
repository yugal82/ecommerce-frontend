import React from 'react';

const Payment = () => {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-white">Payment mode</legend>
      <p className="mt-1 text-sm text-gray-300">Choose the mode of payment</p>
      <div className="mt-6 flex items-center gap-x-6">
        <div className="flex items-center gap-x-3">
          <input id="card" name="payments" type="radio" className="h-4 w-4 text-primary" />
          <label htmlFor="card" className="block text-sm font-medium leading-6 text-white">
            Credit Card/Debit Card
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input id="cash" name="payments" type="radio" className="h-4 w-4  text-primary" />
          <label htmlFor="cash" className="block text-sm font-medium leading-6 text-white">
            Cash
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default Payment;
