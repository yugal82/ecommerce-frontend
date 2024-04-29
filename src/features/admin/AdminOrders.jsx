import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersAsync, selectOrders, updateOrderAsync } from '../orders/ordersSlice';
import AdminOrderCard from './AdminOrderCard';
import { selectLoggedInUser } from '../auth/authSlice';

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
    dispatch(updateOrderAsync({ updatedOrder, user }));
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
    if (user?.role === 'admin') dispatch(getAllOrdersAsync(user));
  }, [dispatch, user]);

  return (
    <section className="mx-auto max-w-7xl py-6 sm:py-12 px-4">
      <div className="">
        <div className="inline-block w-full mx-auto py-2 align-middle md:px-6 lg:px-8">
          <h2 className="text-2xl text-white font-semibold py-6">All Orders</h2>
          <div className="overflow-hidden md:rounded-lg shadow-md pb-12">
            <div className="">
              <div className="bg-primary grid grid-cols-5 gap-2">
                {['Invoice No.', 'Total Bill', 'Payment', 'Status', 'Actions'].map((heading) => (
                  <div key={heading} className="py-3.5 px-1 text-sm font-normal text-white">
                    <div className="flex items-center gap-x-3">
                      <span>{heading}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#1c1c1c] divide-y divide-gray-600">
                {orders?.map((order) => (
                  <AdminOrderCard
                    key={order?.id}
                    order={order}
                    handleEditClick={handleEditClick}
                    onStatusChange={onStatusChange}
                    statusColor={statusColor}
                    editableOrderId={editableOrderId}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
