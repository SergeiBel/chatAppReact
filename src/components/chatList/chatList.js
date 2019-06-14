import React from 'react';
import './chatList.css'
import {joinRoom} from "../../actions/socketActions";
import {connect} from "react-redux";

class ChatList extends React.Component{
    render(){
        return(
            <div className="chatList">
            <h1>Your chats</h1>
            <button onClick={() => this.joinRoom(1)}> 1 adidas</button>
            <br/>
            <button onClick={() => this.joinRoom(2)}>2 adas</button>
        </div>
        )
    }

    joinRoom(roomId){
        this.props.socket.emit('join', {room: roomId});
        this.props.joinRoom(roomId)
    }

    componentDidMount() {
        this.props.socket.on(
            'new user', (data)=> {
                console.log(data)
            }
        );
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
        joinRoom: (data)=> {
            dispatch(joinRoom(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);

