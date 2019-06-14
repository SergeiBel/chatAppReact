import React from 'react';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import ChatsContainer from '../../components/chatsContainer/chatContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";


 class App extends React.Component{
    render() {
        return(
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={ChatsContainer}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </div>
        </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        math: state.math,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

