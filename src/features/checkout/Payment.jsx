import React from 'react';

const Payment = ({ onPaymentChange, selectedPaymentMethod }) => {
  const onPaymentInputChange = (e) => onPaymentChange(e.target.value);

  return (
    <div>
      <div className="text-sm font-semibold leading-6 text-white">Payment mode</div>
      <p className="mt-1 text-sm text-gray-300">Choose the mode of payment</p>
      <div className="mt-6 flex items-center gap-x-6">
        <div className="flex items-center gap-x-3">
          <input
            onChange={(e) => onPaymentInputChange(e)}
            id="card"
            name="payments"
            type="radio"
            className="h-4 w-4 text-primary"
            value="card"
            checked={selectedPaymentMethod === 'card'}
          />
          <label htmlFor="card" className="block text-sm font-medium leading-6 text-white">
            Credit Card/Debit Card
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            onChange={(e) => onPaymentInputChange(e)}
            id="cash"
            name="payments"
            type="radio"
            className="h-4 w-4  text-primary"
            value="cash"
            checked={selectedPaymentMethod === 'cash'}
          />
          <label htmlFor="cash" className="block text-sm font-medium leading-6 text-white">
            Cash
          </label>
        </div>
      </div>
      {selectedPaymentMethod === 'card' && (
        <div>
          <span className="block text-base font-medium text-white mt-2">Enter your Card details:</span>
          <form>{/* Render a form that asks for credit/debit card number, name, expiry date, and CVC */}</form>
        </div>
      )}
    </div>
  );
};

export default Payment;
