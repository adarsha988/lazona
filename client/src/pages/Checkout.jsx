import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // Custom styles
import {removeAll} from "../slices/cartSlice"
import { create } from "../slices/orderSlice";
import { useCallback } from "react";
import {URLS } from "../constants";
import API from "../utils/api";
import { SERVER_URL } from "../constants";
const Checkout = () => {
  const [stripeCheckout,setstripeCheckout]= useState({
    stripeId:"",
    url:"",
  });
const {cart}= useSelector((state)=>state.cart)
const dispatch=useDispatch();
const navigate=useNavigate();
const [checkout,setCheckout]= useState({
   name:" ",
   email:"",
   address:"",
   payment:"",
   country:"",
   state:"",
   amount:"",
   pobox:"", 
})
const getTotal=()=>{
    return cart.reduce((acc,obj)=>acc+obj.price * obj.quantity,0)
}
const handleClick=async(e)=>{
 e.preventDefault()
const payload=checkout;
const { address,pobox,state,country,payment, ...rest}=payload
rest.address=address.concat(", ",state,", ", country ,", ", pobox);
rest.amount=getTotal();
const products= cart.map((item)=>{
    return{
        product:item?._id,
        quantity:Number(item?.quantity),
        price:Number(item?.price),
        amount:Number(item?.quantity)*Number(item?.price)
    }
})
rest.products=products;

rest.orderId=stripeCheckout?.stripeId;
const data= await dispatch(create(rest))

if (data && data.payload.msg ==="success"){
  dispatch(removeAll());
window.location.replace(stripeCheckout?.url)
} else{
navigate("/checkout/failed");
}
};

const createPayments=useCallback(()=>{
  
  return  cart.map((item)=>{
      return{
            
      price_data: {
        currency: 'usd',
        product_data: {
          name: item?.name,
        },
        unit_amount: Number(item?.price),
      },
      quantity: Number(item?.quantity),
  
      };
    })
},[cart])
const createPaymentIntent= useCallback(async()=>{
  
  
    try{
      const Data=createPayments();
     const response= await API.post(`${URLS.ORDERS}/create-checkout-session`, Data)
    const cs = await response.data;
    setstripeCheckout(()=>({stripeId:cs?.data?.id,url: cs?.data?.url}))
  } catch (error){
    alert("Error:",error);
  }

},[createPayments])



useEffect(()=>{ 
createPaymentIntent();
},[createPaymentIntent])
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <div key={item._id}  className="border-bottom border-muted">
                  <li className="order-item">
              <img src={item && item.images[0].includes("https:")? item?.images[0]:item && item?.images[0]? SERVER_URL+"/"+item.images[0]:"No image"} alt={item.name} className="item-image" />
              <div className="item-details">
                <p>{item.name}</p>
                <p>
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </li>
            </div>
          
          ))}
        </ul>
        <h3>Total: ${cart.reduce((acc,item)=>acc+(item.quantity*item.price),0)}</h3>
      </div>

      {/* Address Selection */}
      <div className="user-address">
        <h2>User Address</h2>
        <form>
        <label htmlFor="fullName">Full name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Add New Address"
            value={checkout?.name}
            onChange={(e)=>{
                setCheckout((prev)=>{return{...prev,name:e.target.value}})
            }}
           required/>
        <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Add New Address"
            value={checkout?.email}
            onChange={(e)=>{
                setCheckout((prev)=>{return{...prev,email:e.target.value}})
            }}
           required/>
        </form>
      </div>

      {/* Address Selection */}

      
      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <form>
            <label htmlFor="address">Address</label>
            <input type="text" 
            className="form-control"
            id="address"
            placeholder="1234 Main st"
            required
            value={checkout?.address}
            onChange={(e)=>{
                setCheckout((prev)=>{
                return{
                    ...prev,address:e.target.value
                };
                })
            }}/>
            <label htmlFor="country">Country</label>
          <select
          className="form-select"
            value={checkout?.country}
            onChange={(e)=>{
                setCheckout((prev)=>{
                return{
                    ...prev,country:e.target.value
                }})}}
            required
          >
            <option value="">Select Address</option>
            <option value="nepal">Nepal</option>
            <option value="india">India</option>
          </select>
            <label htmlFor="state">State</label>
          <select
          className="form-select"
            value={checkout?.state}
            onChange={(e)=>{
                setCheckout((prev)=>{
                return{
                    ...prev,state:e.target.value
                }})}}
            required
          >
            <option >Select Address</option>
            <option value="bagmati">Bagmati</option>
            <option value="gandaki">Gandaki</option>
            <option value="karnali">Karnali</option>
            <option value="koshi">koshi</option>
            <option value="lumbini">Lumbini</option>
            <option value="madhesh">Madhesh</option>
            <option value="sudurpashim">Sudurpashchim</option>
          </select>
          <label htmlFor="zip">P.O.Box</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            placeholder=""
            value={checkout?.pobox}
            onChange={(e)=>{
                setCheckout((prev)=>{
                    return {...prev,pobox:e.target.value}
                })
            }}
           required
          />
        </form>
      </div>

      {/* Payment Details */}
      <div className="payment-details">
        <h2>Payment Details</h2>
        <form >
         <div>
         <input className="form-check-input"type="radio" name="inlineRadioOptions" value="COD" defaultChecked />
         <label className="form-check-label" htmlFor="inlineRadio1">
           Cash on delivery
           </label>
            </div> 
         
         <div>
         <input className="form-check-input"type="radio" name="inlineRadioOptions" value="Paypal" disabled />
         <label className="form-check-label" htmlFor="inlineRadio2">
            Credit Card / Debit Card
           </label>
            </div> 
         
         <div>
         <input className="form-check-input"type="radio" name="inlineRadioOptions" value="Paypal" disabled />
         <label className="form-check-label" htmlFor="inlineRadio2">
            Paypal
           </label>
            </div> 
         &nbsp;
          <label>
            Expiry Date:
            <input type="month" required />
          </label>
          <label>
            CVV:
            <input type="password" placeholder="Enter CVV" />
          </label>
          <button type="submit" className="place-order-btn" onClick={(e)=>{handleClick(e)}}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
