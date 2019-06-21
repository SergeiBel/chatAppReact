import React from 'react';
import './chatContainer.css';
import ChatList from '../../containers/chatList/chatList';
import OneChat from '../../containers/oneChat/oneChat';
import {connect} from "react-redux";
import {initApp} from "../../actions/userActions";

class ChatContainer extends React.Component{
    render() {
        return(
            <div className='chatContainer'>
                <ChatList/>
                <OneChat/>
            </div>
        )}

    componentDidMount(){
        if(localStorage.getItem('_ID')){
            this.props.initApp(localStorage.getItem('_ID'))
        } else {
            this.props.history.push('/login')
        }
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);




