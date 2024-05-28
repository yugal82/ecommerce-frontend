import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminOrderDetails = () => {
  const { state } = useLocation();

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-20 px-4 text-white min-h-screen">
      <div className="text-3xl font-semibold pb-10 border-b border-gray-300">Order details</div>
      <div className="px-8">
        <div className="my-2 text-lg font-semibold">
          Order id: <span className="underline">#{state?.id}</span>
        </div>
        <div className="my-2 text-lg font-semibold">
          Ordered by (user id): <span className="underline">#{state?.userId}</span>
        </div>
        <div className="my-2 text-lg font-semibold">Total amount: ₹{state?.totalAmount}</div>
        <div className="capitalize my-2 text-lg font-semibold">Status: {state?.status}</div>
        <div className="capitalize my-2 text-lg font-semibold">Payment mode: {state?.paymentMethod}</div>
        <div className="my-2 text-lg font-semibold">
          <p>Items ordered:</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {state?.items?.map((item) => (
              <li key={item.name}>
                <div className="flex items-center gap-x-2 pt-2">
                  <img class="object-cover w-16 h-16 rounded-full" src={item?.imageSrc} alt="" />
                  <div>
                    <p>{item?.name}</p>
                    <p className="text-sm">Size - {item?.size}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
