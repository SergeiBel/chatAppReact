import React from 'react';
import './oneChat.css'
import {addNumber, subtractNumber} from "../../actions/mathActions";
import {connect} from "react-redux";
import {sendMessage} from '../../actions/socketActions'


 class OneChat extends React.Component{
    render(){
        return(
            <div className="oneChat">
                <h1>One chat</h1>
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <div>
                    <input type="text" />
                    <button onClick={() => this.props.sendMessage(1)}> Submit</button>
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        socket: state.socket,
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
        },
        sendMessage: (message) => {
            dispatch(sendMessage(message))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OneChat);


