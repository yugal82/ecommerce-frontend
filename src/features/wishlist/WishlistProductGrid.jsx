import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product-list/product-components/ProductCard';
import { useDispatch } from 'react-redux';
import { deleteItemFromWishlistAsync } from './wishlistSlice';

const WishlistProductsGrid = ({ wishlistItems }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => dispatch(deleteItemFromWishlistAsync(item?.id));

  return (
    <div className="w-full lg:col-span-3">
      <div className="">
        <div className="px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistItems?.map((item, idx) => (
              <div key={item}>
                {!item?.item?.deleted && (
                  <div>
                    <Link key={idx} to={`/product-details/${item?.item?.id}`} state={{ product: item?.item }}>
                      <ProductCard product={item?.item} />
                    </Link>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="bg-red-700 text-white px-2 py-0.5 rounded-md mt-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductsGrid;
