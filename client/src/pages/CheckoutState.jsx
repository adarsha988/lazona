import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutState.css"; // Custom styles

const CheckoutSuccess = (
{    type="success",
    msgHeader="Success",
    msg,}
 ) => {
  return (
    <div className="checkout-container">
      <div className="success-message">
        <div style={{ color: type ==="success" ? "#28a745":"#ff0000"}}>
           {
            
                type === "success" 
                ? <span style={{ fontSize: "50px" }}> &#10003; </span> // Increase size for success
                : <span style={{ fontSize: "50px" }}> &#8855; </span> // Increase size for failure
            }
        </div>
        <div style={{ color: type ==="success" ? "#28a745":"#ff0000"}}>
        <h1> {msgHeader ?? "Thank You for Your Order!"}</h1>
        <p>{msg??"Your order has been placed successfully!"}</p>
        </div>
      </div>
    
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link to="/orders" className="btn btn-secondary">
          View Order History
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
