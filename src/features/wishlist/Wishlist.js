import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { getWishlistedItemsByUserAsync, selectWishlistItems } from './wishlistSlice';
import WishlistProductsGrid from './WishlistProductGrid';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);

  useEffect(() => {
    if (user) dispatch(getWishlistedItemsByUserAsync(user));
  }, [dispatch, user]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {wishlistItems?.length === 0 ? (
        <div className="py-6 text-white h-screen">
          <div className="flex items-center justify-center text-xl font-semibold">
            <h2>The wishlist is empty. Nothing to show here!</h2>
          </div>
          <Link className="flex items-center justify-center underline" to="/">
            Click here to explore products
          </Link>
        </div>
      ) : (
        <div className="w-full flex justify-center py-10">
          <WishlistProductsGrid wishlistItems={wishlistItems} />
        </div>
      )}
    </main>
  );
};

export default Wishlist;
