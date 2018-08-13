import React from 'react';
import '../../style/menu.css';
import { NavLink } from 'react-router-dom';


let Menu = (props) => {
    return (
        <div id="menu">
            <div className="title">Navigation</div>
            <NavLink className="nav" to="/catalog" activeClassName="active">Catalog</NavLink>
            <NavLink className="nav" to="/createPost">Create Post</NavLink>
            <NavLink className="nav" to="/myPosts">My Posts</NavLink>       
        </div>
    )
};

export default Menu;