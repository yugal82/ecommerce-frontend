import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import ImageSlider from '../../components/product-details-components/ImageSlider';
import SizesRadio from '../../components/product-details-components/SizesRadio';
import ColorRadio from '../../components/product-details-components/ColorRadio';
import ProductDesc from '../../components/product-details-components/ProductDesc';
import { useLocation } from 'react-router-dom';
import { addItemInCartAsync } from '../cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { discountedPrice } from '../../utils/constant';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AdminProductDetails = () => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const user = useSelector(selectLoggedInUser);

  const { state } = useLocation();
  console.log(state);
  return (
    <div className="">
      <div className="pt-6 px-8">
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-2">
            <ImageSlider images={state?.product?.images} />
          </div>

          <div className="mt-4 lg:mt-0 lg:col-span-1">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl font-semibold tracking-tight text-white">${discountedPrice(state?.product)}</p>
            <p className="text-lg font-semibold tracking-tight text-gray-300 line-through">${state?.product?.price}</p>

            {/* Reviews */}
            <div className="mt-2">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-primary' : 'text-white',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-primary">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addItemInCartAsync({ item: state.product, quantity: 1 }));
              }}
            >
              {/* Colors */}
              <ColorRadio selectedColor={selectedColor} setSelectedColor={setSelectedColor} product={state?.product} />

              {/* Sizes */}
              <SizesRadio selectedSize={selectedSize} setSelectedSize={setSelectedSize} product={state?.product} />

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white"
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>

        {/* Product info */}
        <ProductDesc product={state?.product} />
      </div>
    </div>
  );
};

export default AdminProductDetails;
