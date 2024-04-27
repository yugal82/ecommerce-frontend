import React from 'react';
import { PencilIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

const AdminOrderCard = ({ order, onStatusChange, handleEditClick, statusColor, editableOrderId }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="px-4 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <Link to={`/admin/orders/order-details/${order?.id}`} state={order} className="underline">
            #{order?.id.substr(0, 4)}...{order?.id.substr(-4)}
          </Link>
        </div>
      </div>
      <div className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">₹{order?.totalAmount}</div>
      <div className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div className="text-primary">
          <h2 className="text-sm font-normal capitalize">{order?.paymentMethod}</h2>
        </div>
      </div>
      {/* <div className="px-4 py-4 text-sm text-white whitespace-nowrap">
        <div className="flex items-center gap-x-2">
          <div>
            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
              {order?.user?.name ? order?.user?.name : 'Guest user'}
            </h2>
            <p className="text-xs font-normal text-gray-600 ">{order?.user?.email}</p>
          </div>
        </div>
      </div> */}
      {/* <div className="px-4 py-4 text-sm text-white  whitespace-nowrap">
        <div className="">
          {order?.items?.map((item) => (
            <div className="flex items-center gap-x-2 pt-2">
              <img class="object-cover w-8 h-8 rounded-full" src={item?.imageSrc} alt="" />
              <p>{item?.name}</p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="p-4 text-sm whitespace-nowrap">
        {order?.id !== editableOrderId ? (
          <div className={`font-semibold capitalize ${statusColor(order?.status)} py-1 rounded-md text-center`}>
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
      </div>
      <div className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex">
          <PencilIcon onClick={(e) => handleEditClick(e, order)} className="w-4 text-primary cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
