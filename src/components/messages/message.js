import React from 'react';
import './messages.css'

class Messages extends React.Component{
    render() {
        return(
        <ul className="chatMessages">
            {
                this.props.messages.map(
                    message=> {
                        let messageClass;
                        if(localStorage.getItem('_ID')===message.authorId){messageClass = 'my'}else {messageClass = 'notMy'}
                        return (
                            <div className={messageClass} key={message._id}>
                                <div className='message'>
                                    <span className={messageClass==='my'?'message-author-right':'message-author-left'}>{message.author}</span>
                                    <br/>
                                    <span className='textMessage'>{message.text}</span>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </ul>
        )
    }
}
export default Messages
