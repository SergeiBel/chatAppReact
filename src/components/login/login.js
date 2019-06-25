import React from 'react';
import './login.css'
import axios from 'axios'
import {Button, SvgIcon, TextField} from "@material-ui/core";
import styled, {keyframes} from "styled-components";
import {rotateInDownRight} from "react-animations";
import {Link} from "react-router-dom";
// import { ToastMessage } from "react-toastr";

const RollIn = styled.div`animation: 0.6s ${keyframes`${rotateInDownRight}`}`;

class Login extends React.Component{
constructor(props){
    super(props);
    this.loginForm = React.createRef();
    this.passwordForm = React.createRef();
}

render()
    {return(
        <RollIn>
        <div className="loginContainer">
            <form >
                <TextField
                    className='inputField'
                    placeholder="Input your login"
                    ref={this.loginForm}
                    type='login'
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    margin="normal"
                    autoComplete='off'
                />
                <TextField
                    className='inputField'
                    placeholder="Input your password"
                    ref={this.passwordForm}
                    type='password'
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    margin="normal"
                    autoComplete='none'
                />
                <Button onClick={this.login} variant="outlined" color="primary" className="log-in-button">
                    Log In
                    <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8V4l8 8-8 8v-4H4V8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </SvgIcon>
                </Button>
                <Link to="/register">
                <Button variant="outlined" color="primary" className="log-in-button">
                    Register
                    <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>                    </SvgIcon>
                </Button>
                </Link>
            </form>
        </div>
        </RollIn>

    );
    }

login = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users/login', {
        login: this.loginForm.current.querySelector("input").value,
        password: this.passwordForm.current.querySelector("input").value

    })
        .then((res) => {
            this.props.saveUser({
                ...res.data,
                login: this.loginForm.current.querySelector("input").value,
            });
            this.props.history.push('/')
        })
        .catch((err) => {
                console.log(err)
            }
        )
}
}


export default Login;

