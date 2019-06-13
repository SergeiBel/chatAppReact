import React from 'react';
import './chatContainer.css'
import ChatList from '../chatList/chatList';
import OneChat from '../oneChat/oneChat';

const ChatContainer = function App() {
    return(
        <div className='chatContainer'>
            <ChatList/>
            <OneChat/>
        </div>
    )
};

export default ChatContainer;

