import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAsync } from './userSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  //TODO: We will add payment section when we work on backend.

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const handleEdit = (addressUpdate, index) => {
  //   const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
  //   newUser.addresses.splice(index, 1, addressUpdate);
  //   dispatch(updateUserAsync(newUser));
  //   setSelectedEditIndex(-1);
  // };
  // const handleRemove = (e, index) => {
  //   const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issue
  //   newUser.addresses.splice(index, 1);
  //   dispatch(updateUserAsync(newUser));
  // };

  // const handleEditForm = (index) => {
  //   setSelectedEditIndex(index);
  //   const address = user.addresses[index];
  //   setValue('name', address.name);
  //   setValue('email', address.email);
  //   setValue('city', address.city);
  //   setValue('state', address.state);
  //   setValue('pinCode', address.pinCode);
  //   setValue('phone', address.phone);
  //   setValue('street', address.street);
  // };

  // const handleAdd = (address) => {
  //   const newUser = { ...user, addresses: [...user.addresses, address] };
  //   dispatch(updateUserAsync(newUser));
  //   setShowAddAddressForm(false);
  // };

  return (
    <div>
      <div className="mx-auto mt-12 bg-background max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-white">
            Name: {user?.name ? user?.name : 'New User'}
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-primary">Email address : {user?.email}</h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-8 text-lg text-white">Your Addresses :</p>
          {user?.addresses?.map((address, index) => (
            <div className="mt-4">
              {selectedEditIndex === index ? (
                <form
                  className="border-2 border-dashed px-5 py-12 mb-4"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    // handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="">
                      <h2 className="text-2xl font-semibold leading-7 text-white">Personal Information</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-300">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('name', {
                                required: 'name is required',
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register('phone', {
                                required: 'phone is required',
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('street', {
                                required: 'street is required',
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.street && <p className="text-red-500">{errors.street.message}</p>}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('city', {
                                required: 'city is required',
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-medium leading-6 text-white">
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('state', {
                                required: 'state is required',
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-white">
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register('pinCode', {
                                required: 'pinCode is required',
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                            />
                            {errors.pinCode && <p className="text-red-500">{errors.pinCode.message}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => {
                          setSelectedEditIndex(-1);
                          reset();
                        }}
                        type="submit"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm "
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white">{address.address}</p>
                </div>
                <div className="hidden sm:flex gap-x-4 sm:items-end">
                  <button
                    onClick={(e) => setSelectedEditIndex(index)}
                    type="button"
                    className="font-semibold text-primary"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-semibold text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md mt-10 bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Add a New Address
          </button>
          {showAddAddressForm ? (
            <form
              className="border-2 border-dashed px-5 py-12 mt-6"
              noValidate
              onSubmit={handleSubmit((data) => {
                // handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="">
                  <h2 className="text-2xl font-semibold leading-7 text-white">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', {
                            required: 'name is required',
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm  sm:text-sm sm:leading-6"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register('phone', {
                            required: 'phone is required',
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-white">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', {
                            required: 'street is required',
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                        />
                        {errors.street && <p className="text-red-500">{errors.street.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', {
                            required: 'city is required',
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                        />
                        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-white">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', {
                            required: 'state is required',
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                        />
                        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-white">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', {
                            required: 'pinCode is required',
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-black sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && <p className="text-red-500">{errors.pinCode.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={(e) => {
                      setShowAddAddressForm(false);
                      reset();
                    }}
                    type="submit"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm "
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
