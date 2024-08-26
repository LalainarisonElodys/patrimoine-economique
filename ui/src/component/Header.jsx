import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='container-fluid'>
            <nav className="navbar navbar-expand-lg fixed-top">
                <ul className="navbar-nav mb-5 mb-lg-0">
                    <li><a href="">Possession List</a></li>
                    <li><a href="">Patrimoine</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;