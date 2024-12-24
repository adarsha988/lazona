import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QTlTtKp31u71hC9o94WOhaPH7kZQa9csAp1dDL1bn8qa7PkIuMZvYX6d6c6ghaiVUQvcvH1na8Ios0OiRGPOW0q00YdcgywwN');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/checkout/success",
      },
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

const App = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch clientSecret from backend
    fetch('http://localhost:4005/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1455, currency: 'usd' }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    )
  );
};

export default App;
