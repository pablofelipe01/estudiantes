import React from 'react';
import { useUser } from "@clerk/nextjs";

const BuyCreditsButton = () => {
  const { user } = useUser();

  const handleClick = async () => {
    try {
      console.log('Sending request to create checkout session');
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      });

      console.log('Received response:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      console.log('Session data:', session);

      // Redirect to Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your request. Please try again.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg"
    >
      Buy Credits
    </button>
  );
};

export default BuyCreditsButton;