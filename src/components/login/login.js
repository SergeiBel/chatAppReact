import React from 'react';
import './login.css'

const Login = function () {
    return(
        <div className="loginContainer">
            <input type="text" placeholder="Your login"/>
            <input type="text" placeholder="Your password"/>
            <button>Submit</button>
        </div>
    )    
};

export default Login;
