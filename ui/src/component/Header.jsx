import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='bg-black fixed-top'>
          <span className='text-warning'>Gestion de patrimoine</span>
            <nav>
                <ul>
                    <li ><Link to="/patrimoine">Patrimoine</Link></li>
                    <li><Link to="/possession">Possessions</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
