import React from 'react';
import {SvgIcon, Button, TextField} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import {zoomIn} from 'react-animations'
import styled, {keyframes} from 'styled-components'
import {addOneChat} from "../../actions/chatActions";

const ZoomIn = styled.div`animation: 0.1s ${keyframes`${zoomIn}`} linear`;
const FadeIn = styled.div`animation: 0.4s ${keyframes`${zoomIn}`} linear`;

class NewChat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCreating: false
        };
        this.chatNameInput = React.createRef();
    }
    render() {
        return(
            <div>
                {this.state.isCreating?(
                     <ZoomIn >
                        <div>
                            <Button className="my-button" variant="outlined" onClick={this.cancel}  >
                                <p>Cancel </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                            </Button>
                            <TextField
                                className='inputField'
                                placeholder="Write chat name here"
                                ref={this.chatNameInput}
                                type='text'
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                margin="normal"
                                autoComplete='none'
                            />
                            <Button onClick={this.createRoom} variant="contained" color="primary" className="my-button" >
                                <p>
                                    Create chat
                                </p>
                            </Button>
                        </div>
                     </ZoomIn>
                ):(
                    <FadeIn>
                       <Button onClick={this.openInput} variant="contained" color="primary" className="my-button" >
                            <p>
                                Create chat
                            </p>
                            <SvgIcon >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>
                            </SvgIcon>
                        </Button>
                    </FadeIn>
                )}
            </div>
        )
    }

    openInput = () => {
        this.setState({'isCreating': true})
    };

    cancel = () => {
        this.setState({'isCreating': false})
    };

    createRoom = (e) => {
        e.preventDefault();
        axios.post(
            'http://localhost:3000/chat/room',
            {name: this.chatNameInput.current.querySelector("input").value,
            })
            .then(
                res => {
                    const chat  =res.data;
                    this.props.socket.emit('new_chat', {chat});
                    this.props.addOneChat(chat);
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            );
        this.setState({'isCreating': false})
    };
    
    componentDidMount() {
    }
}
const mapStateToProps = (state) => {
    return {
        socket: state.chat.socket,
        user: state.user,
        chatList: state.chat.chatList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOneChat: (data) => {
            dispatch(addOneChat(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewChat);

