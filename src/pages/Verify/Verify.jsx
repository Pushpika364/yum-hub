import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './Verify.css'; // Import your CSS file

export default function Verify() {
  const location = useLocation(); // Get the current location
  const params = new URLSearchParams(location.search); // Parse the query string
  const orderId = params.get('orderId'); // Get the value of 'orderId' parameter
  return (
    <div className="verify-container">
      <h3>
        Order Success!
      </h3>
      <p>
        Your order ID: <span className="order-id">{orderId}</span>
      </p>
    </div>
  );
}
