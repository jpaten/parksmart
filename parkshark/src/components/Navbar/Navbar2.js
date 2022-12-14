import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { NavLink } from './NavbarElements'
import fire from '../SignIn/fire';
import './Button.css';

const handleLogout = () => {
    fire.auth().signOut();
  }

function Navbar2() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

function Button() {
  return (
    <Link onClick= {handleLogout}>
      <button className='btn hide-on-mobile'>Logout</button>
    </Link>
  );
}
  return (
    <>
      <nav className='navbar'>
        <div className='Title'>
          <span className="poppins-bold-pacific-blue-52px">ParkShark</span>
        </div>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link
              to='/Home'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/Listings'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Find Listings
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/new'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Create A Listing
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/About'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/Profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}



export default Navbar2;