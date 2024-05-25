import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { currentUser, updateUser } = useContext(AuthContext);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/signout");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        updateUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar-name">YUM HUB..</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-app")}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {currentUser ? (
          <>
            {/* <p>{currentUser.email}</p> */}
            <button onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};
