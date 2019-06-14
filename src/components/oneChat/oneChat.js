import React from 'react';
import './oneChat.css'
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
         let message = {
             message: a,
             room: this.props.room
         };
         console.log(this.props.room);
         this.props.sendMessage(message);
     };

     componentDidMount(){
         this.props.socket.on('message', (message) => {
            console.log(message);
        })
     }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        socket: state.socket.socket,
        room: state.room
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessage(message))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OneChat);


