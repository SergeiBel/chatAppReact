import React from 'react';
import './chatList.css'
import {connect} from "react-redux";
import axios from 'axios';
import {setActiveChat} from "../../actions/chatActions"
import {saveChatList} from "../../actions/chatActions";
import {addOneChat} from "../../actions/chatActions";
import NewChat from "../newChat/newChat"
import styled, {keyframes} from "styled-components";
import {rollIn} from "react-animations";

const RollIn = styled.div`animation: 0.4s ${keyframes`${rollIn}`} linear`;
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('ACCESS_TOKEN');

class ChatList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            messages: '',
        }
    }
    render(){
        return(
            <div className="chatList">
                <div className="chatListContainer">
                    <h1>All chats</h1>
                    <NewChat />
                    <ul>{
                        this.props.chatList.map(
                            room => {
                                return (
                                  <RollIn key={room._id} >
                                      <button className='button-container' onClick={() => this.openRoom(room)}> {room.name} chat</button>
                                  </RollIn>
                                )}
                        )
                    }</ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if(localStorage.getItem('_ID')){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('ACCESS_TOKEN');
            axios.get('http://localhost:3000/chat/room')
            .then(
                res => {
                    this.props.setActiveChat(res.data[0]);
                    this.props.saveChatList(res.data);
                }
            )
        }
        this.props.socket.on('new_chat',
        (data) => {
            this.props.addOneChat(data.chat);
        })
    }

    openRoom(room){
        this.props.setActiveChat(room)
    }
}

const mapStateToProps = (state) => {
    return {
        socket: state.chat.socket,
        user: state.user,
        chatList: state.chat.chatList,
        activeChat: state.chat.activeChat,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveChat: (data) => {
            dispatch(setActiveChat(data))
        },
        saveChatList: (data) => {
            dispatch(saveChatList(data))
        },
        addOneChat: (data) => {
            dispatch(addOneChat(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

