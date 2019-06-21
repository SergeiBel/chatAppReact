import React from 'react';
import './oneChat.css'
import {connect} from "react-redux";
import axios from "axios";
import Messages from '../../components/messages/message';
import {SvgIcon, Button, TextField} from "@material-ui/core";


class OneChat extends React.Component{
    constructor(props) {
        super(props);
        this.myInput = React.createRef();
        this.state= {
            messages: [],
            isJoined: false,
        }
    }
    render(){
        return(
            <div className="oneChat">
                {this.props.activeChat?<h1>{this.props.chat.activeChat.name}</h1>:null}
                <Messages messages={this.state.messages}/>
                {
                    this.state.isJoined?
                        (
                            <form className='messageForm'>
                                <TextField
                                    className='messageInput'
                                    placeholder="Input your message"
                                    ref={this.myInput}
                                    type='text'
                                    margin="none"
                                    autoComplete='off'
                                />
                                <Button onClick={this.sendMessage} variant="contained" color="primary">
                                    Send
                                    <SvgIcon className="sendIcon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                    </SvgIcon>
                                </Button>
                            </form>
                        ):(
                            <Button onClick={this.join} variant="contained" size="small">
                                <span className='joinText'>Join Chat</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"/></svg>
                            </Button>
                        )
                }
            </div>
        )
    }

    join = (e) => {
        e.preventDefault();
        this.setState({isJoined: true});
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
                 message: this.myInput.current.querySelector("input").value,
                 room: this.props.activeChat._id,
                 _id: localStorage.getItem('_ID')
             }
         );
         this.setState({messages: [...this.state.messages,
                 {
                     text: this.myInput.current.querySelector("input").value,
                     authorId: localStorage.getItem('_ID'),
                     author: localStorage.getItem('LOGIN'),
                     _id: Date.now().toLocaleString(),
                 }]})
     };

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevProps.activeChat !== this.props.activeChat&&this.props.activeChat){
            axios.get(
                `http://localhost:3000/chat/messages/${this.props.activeChat._id}`
            )
                .then(
                    response => {
                        console.log(response)
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
