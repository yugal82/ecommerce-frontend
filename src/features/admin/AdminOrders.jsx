import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersAsync, selectOrders } from '../orders/ordersSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { PencilIcon } from '@heroicons/react/20/solid';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user?.role === 'admin') dispatch(getAllOrdersAsync());
  }, [dispatch, user]);

  return (
    <section className="px-4 mx-auto">
      <div className="flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <h2 className="text-2xl text-white font-semibold py-6">All Orders</h2>
            <div className="overflow-hidden md:rounded-lg shadow-md pb-12">
              <table className="min-w-full">
                <thead className="bg-primary">
                  <tr>
                    {['Invoice No.', 'Total Amount', 'Payment Method', 'Customer', 'Items', 'Status', 'Actions'].map(
                      (heading) => (
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal rtl:text-right text-white">
                          <div className="flex items-center gap-x-3">
                            <span>{heading}</span>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-[#1c1c1c] divide-y divide-gray-600">
                  {orders?.map((order) => (
                    <tr key={order?.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <span>#{order?.id}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">₹{order?.totalAmount}</td>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="text-primary">
                          <h2 className="text-sm font-normal capitalize">{order?.selectedPaymentMethod}</h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white dark:text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <div>
                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                              {order?.user?.name ? order?.user?.name : 'Guest user'}
                            </h2>
                            <p className="text-xs font-normal text-gray-600 ">{order?.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white dark:text-gray-300 whitespace-nowrap">
                        <div className="">
                          {order?.items?.map((item) => (
                            <div className="flex items-center gap-x-2 pt-2">
                              <img class="object-cover w-8 h-8 rounded-full" src={item?.item?.imageSrc} alt="" />
                              <p>{item?.item?.name}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <div className="text-white font-semibold capitalize bg-yellow-300 py-1 rounded-md bg-opacity-80 text-center">
                          {order?.status}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <PencilIcon className="w-4 text-primary cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
