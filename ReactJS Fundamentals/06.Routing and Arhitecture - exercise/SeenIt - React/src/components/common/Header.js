import React, { Component } from 'react';
import '../../style/header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('username')) {
          this.setState({username: localStorage.getItem('username')});
        }
    }

    render () {
        const loggedUser =  
                <div id="profile">
                    <span>Hello, {this.state.username}</span>|<Link to="/logout">logout</Link>
                </div>
        return (
            <header>
                <span className="logo">☃</span><span className="header">SeenIt</span>     
                {this.state.username ? loggedUser : null}
            </header>
        )
    }
};

export default Header;