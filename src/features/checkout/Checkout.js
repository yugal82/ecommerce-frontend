import React, { useState } from 'react';
import Cart from '../cart/Cart';
import Payment from './Payment';
import AddressList from './AdressList';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderAsync, selectLatestOrder } from '../orders/ordersSlice';
import { selectCartItems } from '../cart/cartSlice';
import { Navigate } from 'react-router-dom';
import { discountedPrice } from '../../utils/constant';
import { selectUserInfo, updateUserAsync } from '../user/userSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Checkout = () => {
  // redux-toolkit
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  const cartProducts = useSelector(selectCartItems);
  let latestOrder = useSelector(selectLatestOrder);

  // states
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [razorpayPaymentSuccess, setRazorpayPaymentSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const alert = useAlert();

  const onAddressChange = (address) => setSelectedAddress(address);
  const onPaymentChange = (payment) => setSelectedPaymentMethod(payment);

  const handleOrderClick = async (e) => {
    if (selectedAddress === null) {
      alert.error('Select mailing address');
    }
    if (selectedPaymentMethod === null) {
      alert.error('Please select payment method');
    }

    if (selectedPaymentMethod && selectedAddress) {
      const totalAmount = cartProducts.reduce(
        (amount, product) => discountedPrice(product?.productId) * product?.quantity + amount,
        0
      );
      const items = [];
      cartProducts?.map((product) => {
        items.push({ ...product?.productId, quantity: product?.quantity, size: product?.size });
      });
      const order = {
        items: items,
        userId: userInfo?.id,
        paymentMethod: selectedPaymentMethod,
        selectedAddress,
        totalAmount,
        status: 'pending',
      };

      // if the payment option is Razorpay, then don't directly create an order.
      if (selectedPaymentMethod === 'card') {
        // first do some processing for razorpay payment
        await createOrderByRazorpay(totalAmount);
        dispatch(createOrderAsync({ order, user }));
        alert.success('Your order has been placed.');
      } else {
        dispatch(createOrderAsync({ order, user }));
        alert.success('Your order has been placed.');
      }
    }
    setSelectedAddress(null);
    setSelectedPaymentMethod(null);
  };

  const createOrderByRazorpay = async (totalAmount) => {
    const response = await axios.get('http://localhost:8080/payment/get-key');
    const razorpay_key = response?.data?.key;

    const orderResponse = await axios.post('http://localhost:8080/payment/checkout', { amount: totalAmount });
    const order = orderResponse?.data?.data;
    const options = {
      key: razorpay_key,
      amount: order?.amount,
      currency: 'INR',
      name: 'Ecommerce App',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: order?.id,
      // callback_url: 'http://localhost:8080/payment/verify',
      handler: async function (response) {
        const verifyRes = await axios.post('http://localhost:8080/payment/verify', {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        });
        if (verifyRes.status === 200) setRazorpayPaymentSuccess(true);
        else alert.error('Payment request failed');
      },
      prefill: {
        // details of the logged in user
        name: userInfo?.name,
        email: userInfo?.email,
        contact: userInfo?.phone,
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#43a08f',
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
      {latestOrder && latestOrder.paymentMethod === 'cash' && (
        <Navigate to={`/order-success/${latestOrder?.id}`} replace={true} />
      )}
      {latestOrder && razorpayPaymentSuccess && <Navigate to={`/order-success/${latestOrder?.id}`} replace={true} />}
      {/* Stripe payment */}
      {/* {latestOrder && latestOrder.paymentMethod === 'card' && <Navigate to="/payment-checkout" replace={true} />} */}
      <div className="lg:col-span-3 mt-8">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            const stringAddress = data?.street + ' ' + data?.city + ', ' + data?.state + ', ' + data?.pinCode;
            const newUser = {
              ...userInfo,
              addresses: [...userInfo.addresses],
            };
            newUser.addresses.push(stringAddress);
            dispatch(updateUserAsync({ newUser, user }));
            alert.success('Address added successfully');
            reset();
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
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('name')}
                      id="name"
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm sm:text-sm sm:leading-6"
                    />
                  </div>
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

                <div className="col-span-full">
                  <label htmlFor="street" className="block text-sm font-medium leading-6 text-white">
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
                  addresses={userInfo?.addresses}
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
        {cartProducts?.length > 0 && (
          <div className="w-full px-8">
            <button
              onClick={(e) => handleOrderClick(e)}
              className="w-full content-end rounded-md border border-transparent bg-primary px-6 py-2 text-base font-semibold text-white shadow-sm"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
