import React from 'react';
import './messages.css'

class Messages extends React.Component{
    render() {
        return(
        <ul className="chatMessages">
            {
                this.props.messages.map(
                    message=> {
                        return (
                            <div className='message' key={message._id}>
                                <span>{message.author}</span>
                                <br/>
                                <span>{message.text}</span>
                            </div>
                        )
                    }
                )
            }
        </ul>
        )
    }
}
export default Messages;
