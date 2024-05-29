import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import './Stripe.css';
import { useSelector } from 'react-redux';
import { selectLatestOrder } from '../orders/ordersSlice';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  'pk_test_51Mgw9KIUA8Ig4zfgFpwxPuaIFaSUg6ddoIDceedj9CopVukhNhWSkN85El7liO4anN2n53n20QztCDrHHED5Htpk00J4WR4zmP'
);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState(null);
  const latestOrder = useSelector(selectLatestOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('https://ecommerce-clothing-api.vercel.app/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ totalAmount: latestOrder.totalAmount, orderId: latestOrder?.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret !== null && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
