import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your food here</h2>
        <p>Choose from a diverse menu a delectable array of dishes crafted</p>
        <button className="header-view-menu">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
