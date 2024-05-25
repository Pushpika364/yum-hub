import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopUp/LoginPopup";
import Cart from "./pages/Cart/Cart";
import Verify from "./pages/Verify/Verify";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <BrowserRouter>
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/order' element={<PlaceOrder/>}/>
            <Route path='/verify' element={<Verify/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
};

export default App;
