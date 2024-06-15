import './navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import image2 from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';  

const Navbar = () => {
    return (
        <div className='nav'>
            <div className='nav__logo'>
                <img src={image2} alt="Logo" />
                <p>Department learning Portal</p>
            </div>
            <ul className="nav-menu">
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
                <li>
                    <Link to="/login">
                        <FontAwesomeIcon icon={faUser} /> {/* Use the imported icon */}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
