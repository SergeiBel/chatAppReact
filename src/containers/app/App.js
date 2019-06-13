import React from 'react';
import Header from '../../components/header/header';
import Login from '../../components/login/login';
import ChatsContainer from '../../components/chatsContainer/chatContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {addNumber, subtractNumber} from '../../actions/mathActions'

 class App extends React.Component{
    render() {
        return(
        <Router>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={ChatsContainer}/>
                    <Route path="/login" component={Login}/>
                </Switch>
                <p>{this.props.math.count}</p>
                <button onClick={() => this.props.addNum(10)}> adda </button>
            </div>
        </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        math: state.math,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNum: (count) => {
            dispatch(addNumber(count))
        },
        subtractNumber: (count) => {
            dispatch(subtractNumber(count))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

