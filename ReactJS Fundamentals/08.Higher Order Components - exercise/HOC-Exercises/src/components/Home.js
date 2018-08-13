import React, { Component } from 'react';
import '../style/site.css';

import { Route, Switch, withRouter } from 'react-router-dom';

import Menu from './common/Menu';
import Catalog from '../components/Post/Catalog';
import CreatePost from '../components/Post/CreatePost';
import MyPosts from '../components/Post/MyPosts';
import Logout from '../components/Logout';
import DeletePost from '../components/Post/DeletePost';
import EditPost from '../components/Post/EditPost';
import DetailsPost from '../components/Post/DetailsPost';

class Home extends Component {
    render () {
        return (
                <div>
                    <Menu />
                    <Switch>
                        <Route exact path='/' component={Catalog}/>
                        <Route path='/catalog' component={Catalog}/>
                        <Route path='/createPost' component={CreatePost}/>
                        <Route path='/myPosts' component={MyPosts}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/deletePost/:id' component={DeletePost}/>
                        <Route path='/editPost/:id' component={EditPost}/>
                        <Route path='/detailsPost/:id' component={DetailsPost}/>  
                    </Switch>
                </div>
        )
    }
}

export default withRouter(Home);



