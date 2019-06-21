import React from 'react';
import './oneChat.css'
import {connect} from "react-redux";
import axios from "axios";
import Messages from '../../components/messages/message'

class OneChat extends React.Component{
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.state= {
            messages: [],
        }
    }
    render(){
        return(
            <div className="oneChat">
                <h1>{this.props.chat.activeChat.name}</h1>
                <Messages messages={this.state.messages}/>
                <form onSubmit={this.sendMessage}>
                    <input ref={this.myInput}/>
                    <button type='submit'> Submit</button>
                </form>
                <button onClick={this.join}>Join </button>
            </div>
        )
    }

    join = (e) => {
        e.preventDefault();
        this.props.socket.emit(
            'join', {
                room: this.props.activeChat._id,
                _id: localStorage.getItem('_ID'),
            }
        )
    };

     sendMessage = (e) =>{
         e.preventDefault();
         this.props.socket.emit(
             'message', {
                 message: this.myInput.current.value,
                 room: this.props.activeChat._id,
                 _id: localStorage.getItem('_ID')
             }
         );
         this.setState({messages: [...this.state.messages,
                 {
                     text: this.myInput.current.value,
                     authorId: localStorage.getItem('_ID'),
                     author: localStorage.getItem('LOGIN'),
                     _id: Date.now().toLocaleString(),
                 }]})
     };

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps.activeChat !== this.props.activeChat) {
            axios.get(
                `http://localhost:3000/chat/messages/${this.props.activeChat._id}`
            )
                .then(
                    response => {
                        this.setState({messages: response.data});
                    }
                );
        }
    }

    componentDidMount() {
         this.props.socket.on(
             'new user', (data)=> {
                 console.log(data)
             }
         );
         this.props.socket.on('message', (message) => {
             if(message.roomId === this.props.activeChat._id){
             this.setState(
                 {messages: [...this.state.messages, message]}
             )} else {

             }

         });
     }
}

const mapStateToProps = (state) => {
    return {
        socket: state.chat.socket,
        chat: state.chat,
        activeChat: state.chat.activeChat,
    }
};


export default connect(mapStateToProps)(OneChat);
