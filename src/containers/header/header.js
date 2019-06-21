import React from 'react';
import {Link} from "react-router-dom";
import './header.css'
import {connect} from "react-redux";
import {deleteUser} from "../../actions/userActions";
import {clearStore} from "../../actions/chatActions";

function Header(props){
    return(
        <header>
            <nav className="top-menu">
                <p className="navbar-logo"><img src="https://html5book.ru/wp-content/uploads/2017/04/lily-logo.png" alt="aaa"/></p>
                <ul className="menu-main">
                    <li>
                        <Link to='/'>
                            <p>Chats</p>
                        </Link>
                    </li>
                    {
                        !props.user._id?(
                            <li>
                                <Link to='/login'>
                                    <p>Login Page</p>
                                </Link>
                            </li>
                        ):null
                    }
                    {
                        !props.user._id?(
                            <li>
                                <Link to='/register'>
                                    <p>Register Page</p>
                                </Link>
                            </li>
                        ):null
                    }
                    {
                        props.user._id?(<li>
                                <Link to='/login'>
                                    <p onClick={props.deleteUser&&props.clearStore}>Log out</p>
                                </Link>
                            </li>)
                           : null
                    }
                </ul>
            </nav>
        </header>
    )
}




const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (data)=> {
            dispatch(deleteUser(data))
        },
        clearStore: (data)=> {
            dispatch(clearStore(data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);


