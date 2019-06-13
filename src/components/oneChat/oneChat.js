import React from 'react';
import './oneChat.css'
import {addNumber, subtractNumber} from "../../actions/mathActions";
import {connect} from "react-redux";
import {sendMessage} from '../../actions/socketActions'


 class OneChat extends React.Component{
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
    }
    render(){
        return(
            <div className="oneChat">
                <h1>One chat</h1>
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <form onSubmit={this.submitForm}>
                    <input ref={this.myInput}/>
                    <button type='submit'> Submit</button>
                </form>
            </div>
        )
    }
     submitForm = (e) =>{
         e.preventDefault();
         const a =this.myInput.current.value;
         this.props.sendMessage(a);
     };

     componentDidMount(){
         const {socket} = this.props;
         socket.on('message', (message) => {
            console.log(message)
        })
     }

}


const mapStateToProps = (state) => {
    return {
        socket: state.socket.socket,
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


