import React from 'react';
import {Link} from "react-router-dom";
import './header.css'


const Header = function App() {
    return(
        <header>
            <div>
                Logo
            </div>
            <nav>
                <Link to='/'>
                    <p>Chats</p>
                </Link>
                <Link to='/login'>
                    <p>Login Page</p>
                </Link>
                <Link to='/register'>
                    <p>Register Page</p>
                </Link>
            </nav>
        </header>
    )
};

export default Header;

