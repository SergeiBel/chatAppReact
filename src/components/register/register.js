import React from 'react';
import './register.css'
import axios from "axios";
import {Button, SvgIcon, TextField} from "@material-ui/core";
import styled, {keyframes} from "styled-components";
import {rotateInDownLeft} from "react-animations";
import {Link} from "react-router-dom";


const RollIn = styled.div`animation: 0.6s ${keyframes`${rotateInDownLeft}`} linear`;

class Register extends React.Component{
    constructor(props){
        super(props);
        this.loginInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();
    }

    render() {
        return(
            <RollIn>
            <div className="loginContainer">
                <form >
                    <TextField
                        className='inputField'
                        placeholder="Input your login"
                        ref={this.loginInput}
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
                        ref={this.passwordInput}
                        type='password'
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        margin="normal"
                        autoComplete='none'
                    />
                    <TextField
                        className='inputField'
                        placeholder="Confirm your password"
                        ref={this.confirmPasswordInput}
                        type='password'
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                        margin="normal"
                        autoComplete='none'
                    />
                    <Button onClick={this.register} variant="outlined" color="primary" className="log-in-button">
                        Register
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>                        </SvgIcon>
                    </Button>
                   <Link to="/login">
                    <Button variant="outlined" color="primary" className="log-in-button">
                        Log In
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 8V4l8 8-8 8v-4H4V8z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                        </SvgIcon>
                    </Button>
                   </Link>
                </form>
            </div>
            </RollIn>
        )
    }


    register = (e) => {
        e.preventDefault();
        console.log(this.loginInput.current.querySelector("input").value, this.passwordInput.current.querySelector("input").value)
            axios.post('http://localhost:3000/users/signup', {
                login: this.loginInput.current.querySelector("input").value,
                password: this.passwordInput.current.querySelector("input").value,
            })
                .then((res) => {
                    console.log(res)
                })
        }

}


export default Register;
