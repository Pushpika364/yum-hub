import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { currentUser } = useContext(AuthContext);

  const handleAddToCart = (id) => {
    if (currentUser) {
      addToCart(id);
    } else {
      toast.error("Please log in to add items to the cart.");
    }
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={`http://localhost:4000/uploads/${image}`} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt="Add"
            onClick={() => handleAddToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-items-desc">{description}</p>
        <p className="food-items-price">LKR&nbsp;&nbsp;{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;

