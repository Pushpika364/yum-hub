import React from 'react'
import'./Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                    <h2 className='footer-name'>YUM HUB..</h2>
                    <p>all delicious foods available</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>

                    </div>
            </div>
            <div className="footer-content-center">
                    <h2>COMPANY</h2>
                   <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                    </ul> 
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <li>076-3645001</li>
                <li>contact@yumhub.com</li>
            </div>

        </div>
        <p className="footer-copyright">Copyright 2024@ yumhub.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer