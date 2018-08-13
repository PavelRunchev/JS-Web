import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render () {
        return (
            <header>
                <h1> Welcome Site </h1>
                <nav>
                    <NavLink activeClassName="activeLink" to="/home">Home </NavLink>
                    <NavLink activeClassName="activeLink" to="/about"> About</NavLink>
                </nav>
            </header>
        )
    }
}