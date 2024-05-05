import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminOrderDetails = () => {
  const { state } = useLocation();

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-20 px-4 text-white min-h-screen">
      <div className="text-3xl font-semibold pb-10 border-b border-gray-300">Order details</div>
      <div className="px-8">
        <div className="my-2 text-lg font-semibold">Order id: #{state?.id}</div>
        <div className="my-2 text-lg font-semibold">Ordered by (user id): #{state?.userId} </div>
        <div className="my-2 text-lg font-semibold">Total amount: ₹{state?.totalAmount}</div>
        <div className="capitalize my-2 text-lg font-semibold">Status: {state?.status}</div>
        <div className="capitalize my-2 text-lg font-semibold">Payment mode: {state?.paymentMethod}</div>
        <div className="my-2 text-lg font-semibold">
          <p>Items ordered:</p>
          <ul className="list-decimal ml-10">
            {state?.items?.map((item) => (
              <li key={item.name}>{item?.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
