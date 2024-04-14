import React, { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Cart from '../cart/Cart';
import Payment from './Payment';
import AddressList from './AdressList';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, updateUserAsync } from '../auth/authSlice';

const addresses = [
  { address: 'A2/201, Basil Homes Society, near Terapanth Bhavan, Bibvewadi, Pune-37' },
  { address: '121, Solapur Bazaar, near Pulgate bus stop, Camp, Pune-01' },
  { address: '1831 E Apache Blvd, Apt B-4098, Tempe, 85281' },
];

const Checkout = () => {
  // redux-toolkit
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  // states
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onAddressChange = (address) => setSelectedAddress(address.address);
  const onPaymentChange = (payment) => setSelectedPaymentMethod(payment);

  const handleOrderClick = (e) => {};

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      <div className="lg:col-span-3 mt-8">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            // this handleSubmit should call the API for updating a user. Since we are storing the list of address in user schema, we will update the user.
            // dispatch(updateUserAsync({ ...user, addresses: [...user.address, data] }));
            console.log(data);
            reset({
              email: '',
              firstName: '',
              lastName: '',
              phone: '',
              city: '',
              region: '',
              postalCode: '',
              streetAddress: '',
            });
          })}
        >
          <div className="w-full px-8">
            <div className="border-b border-white pb-12">
              <h2 className="text-lg font-medium text-white">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-300">
                Use a permanent address where you can receive the product.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('firstName')}
                      id="firstName"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('lastName')}
                      id="lastName"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is a mandatory field',
                        pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi, message: 'Email not valid' },
                      })}
                      id="email"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="text-red-500 font-semibold text-sm">{errors?.email?.message}</p>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      {...register('phone')}
                      id="phone"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-white">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('streetAddress')}
                      id="streetAddress"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('city')}
                      id="city"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('region')}
                      id="region"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-white">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('postalCode')}
                      id="postalCode"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <button
                  type="reset"
                  className="rounded-md border border-transparent bg-white px-6 py-2 text-base font-semibold text-primary shadow-sm mr-2"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-primary px-6 py-2 text-base font-semibold text-white shadow-sm"
                >
                  Add Address
                </button>
              </div>
            </div>

            <div className="mt-4 pb-12">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">Address</h2>
                <p className="mt-1 text-sm leading-6 text-gray-300">Choose from previously used address.</p>
                <AddressList
                  addresses={addresses}
                  onAddressChange={onAddressChange}
                  selectedAddress={selectedAddress}
                />
              </div>
              <div className="mt-10 space-y-10">
                <Payment onPaymentChange={onPaymentChange} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="lg:col-span-2">
        <Cart isCheckout={true} />
        <div className="w-full px-8">
          <button
            onClick={(e) => handleOrderClick(e)}
            className="w-full content-end rounded-md border border-transparent bg-primary px-6 py-2 text-base font-semibold text-white shadow-sm"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
