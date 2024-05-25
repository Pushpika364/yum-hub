import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const { getTotalCartAmount, food_list, cartItems, token, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      userId: currentUser._id,
    };
    let res = await axios.post(
      "http://localhost:4000/api/order/place",
      orderData
    );
    if (res.data.success) {
      const sessionUrl = res.data.session_url;
      window.location.replace(sessionUrl);
    } else {
      console.log("Error:", res.data);
    }
  };
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            value={data.firstName}
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <input
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <input
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            value={data.zipcode}
            name="zipcode"
            type="text"
            placeholder="Zip Code"
          />
          <input
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={data.phone}
          name="phone"
          type="text"
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
