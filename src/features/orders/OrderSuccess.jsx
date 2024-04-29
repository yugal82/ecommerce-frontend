import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectLoggedInUser } from '../auth/authSlice';
import { resetLatestOrder } from './ordersSlice';
import { resetCartAsync } from '../cart/cartSlice';

const OrderSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(resetCartAsync(user));
    dispatch(resetLatestOrder());
  }, [dispatch, user]);

  return (
    <>
      <main className="py-20 h-screen">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Order successful!</h1>
          <p className="mt-6 text-lg text-white">
            Your order id is <span className="underline">#{id}</span>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
              Explore more products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
