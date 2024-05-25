import './Navbar.css'
import '../../assets/assets'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt=""/>
  <img classname ='profile' src={assets.profile_image} alt=""/>


    </div>
  )
}

export default Navbar