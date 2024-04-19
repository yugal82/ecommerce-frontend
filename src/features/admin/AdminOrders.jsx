import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersAsync, selectOrders, updateOrderAsync } from '../orders/ordersSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { PencilIcon } from '@heroicons/react/20/solid';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const user = useSelector(selectLoggedInUser);

  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEditClick = (e, order) => {
    if (order.id === editableOrderId) setEditableOrderId(-1);
    else setEditableOrderId(order.id);
  };

  const onStatusChange = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-200 text-red-700';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-primary text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return '';
    }
  };

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
                        <th
                          key={heading}
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal rtl:text-right text-white"
                        >
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
                        {order?.id !== editableOrderId ? (
                          <div
                            className={`font-semibold capitalize ${statusColor(
                              order?.status
                            )} py-1 rounded-md text-center`}
                          >
                            {order?.status}
                          </div>
                        ) : (
                          <select
                            className="px-8 py-1 rounded-full bg-transparent text-white"
                            onChange={(e) => onStatusChange(e, order)}
                            name="status"
                            id="status"
                          >
                            <option className="bg-background" value="">
                              Choose status
                            </option>
                            <option className="bg-background" value="pending">
                              Pending
                            </option>
                            <option className="bg-background" value="dispatched">
                              Dispatched
                            </option>
                            <option className="bg-background" value="delivered">
                              Delivered
                            </option>
                            <option className="bg-background" value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <PencilIcon
                            onClick={(e) => handleEditClick(e, order)}
                            className="w-4 text-primary cursor-pointer"
                          />
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
