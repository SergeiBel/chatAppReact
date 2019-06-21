import React from 'react';
import Header from '../header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import ChatsContainer from '../chatsContainer/chatContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from "axios";
import {initApp, saveUser} from "../../actions/userActions";
import {connect} from "react-redux";

axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('ACCESS_TOKEN');

 class App extends React.Component{
    render() {
        return(
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={ChatsContainer}/>
                    <Route path="/login" exact component={(props) => <Login {...props} user={this.props.user} saveUser={this.props.saveUser}/>}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </div>
        </Router>
        )
    }
 }

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initApp: (user) => {
            dispatch(initApp(user))
        },
        saveUser: (message) => {
            dispatch(saveUser(message))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

