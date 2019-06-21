import React from 'react';
import './chatList.css'
import {connect} from "react-redux";
import axios from 'axios';
import {setActiveChat, saveMyChats , addOneChat, saveAllChats} from "../../actions/chatActions"
import NewChat from "../newChat/newChat"
import styled, {keyframes} from "styled-components";
import {rollIn} from "react-animations";
import {Checkbox}  from "@material-ui/core";


const RollIn = styled.div`animation: 0.4s ${keyframes`${rollIn}`} linear`;
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('ACCESS_TOKEN');

class ChatList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chats: [],
            onlyMy: true,
        }
    }
    render(){
        return(
            <div className="chatList">
                <div className="chatListContainer">
                    <h1>All chats</h1>
                    <Checkbox
                        checked={this.state.onlyMy}
                        onClick={this.handleCheck}
                        value="checkedA"
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />
                    <span>Show all</span>
                    <NewChat />
                    <ul>{
                        this.state.chats.map(
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

    handleCheck = (e) => {
        e.preventDefault();
        if(this.state.onlyMy){
            this.setState(
                {
                    onlyMy: !this.state.onlyMy,
                    chats: this.props.myChats
                }
            );
        }else{
            this.setState(
                {
                    onlyMy: !this.state.onlyMy,
                    chats: this.props.chatList
                }
            );
        }
    };

   componentDidMount() {
        if(localStorage.getItem('_ID')){
            axios.get('http://localhost:3000/chat/room')
                .then(
                    res => {
                        this.props.setActiveChat(res.data[0]);
                        this.props.saveAllChats(res.data);
                    }
                );
            axios.get(
                `http://localhost:3000/chat/myRooms`
            )
                .then(
                    response => {
                        this.props.saveMyChats(response.data);
                        this.setState(
                            {
                                chats: this.props.chatList
                            }
                        );
                    }
                );
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
        myChats: state.chat.myChats,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveChat: (data) => {
            dispatch(setActiveChat(data))
        },
        addOneChat: (data) => {
            dispatch(addOneChat(data))
        },
        saveMyChats: (data) => {
            dispatch(saveMyChats(data))
        },
        saveAllChats: (data) => {
            dispatch(saveAllChats(data))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

