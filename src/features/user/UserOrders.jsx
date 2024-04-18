import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrdersAsync, selectUserOrders } from './userSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { discountedPrice } from '../../utils/constant';

const UserOrders = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(getUserOrdersAsync(user));
  }, [dispatch, user]);

  return (
    <div className="text-white">
      {userOrders.length === 0 ? (
        <h2 className="mt-6 text-xl font-medium px-8">You haven't ordered anything before.</h2>
      ) : (
        <div className="px-6 py-8">
          <h1 className="text-4xl block py-4">Your orders</h1>
          {userOrders?.map((order) => (
            <div className="my-2 py-4 bg-[#191919]">
              <h2 className="text-3xl font-semibold px-4 sm:px-6">Items in this order</h2>
              <h2 className="text-lg font-semibold px-4 sm:px-6 capitalize">
                Order stauts: <span className="text-primary">{order?.status}</span>
              </h2>
              <div className="" key={order?.id}>
                <div className="px-4 sm:px-6">
                  <div className="grid grid-cols-2 sm:grid-cols-5">
                    {order?.items?.map((item) => (
                      <li key={item.id} className="flex items-center py-6 list-none">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md shadow-md">
                          <img
                            src={item?.item?.imageSrc}
                            alt="product"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 content-center">
                          <div>
                            <div className="text-base font-medium">
                              <p>{item?.item?.name}</p>
                              <p>${discountedPrice(item?.item)}</p>
                            </div>
                            <div className="text-gray-300">
                              <p className="text-sm font-medium leading-6">Quantity: {item?.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                  <div className="flex items-center text-lg font-medium">
                    <p>Total:</p>
                    <p className="ml-2">${order?.totalAmount}</p>
                  </div>
                  <div className="flex items-center text-lg font-medium">
                    <p>Billing address:</p>
                    <p className="ml-2">{order?.selectedAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
