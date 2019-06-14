import React from 'react';
import './register.css'

const Register = function () {
    return(
        <div className="loginContainer">
            <input type="text" placeholder="Your login"/>
            <input type="text" placeholder="Your password"/>
            <input type="text" placeholder="Confirm password"/>
            <button>Submit</button>
        </div>
    )    
};

export default Register;
