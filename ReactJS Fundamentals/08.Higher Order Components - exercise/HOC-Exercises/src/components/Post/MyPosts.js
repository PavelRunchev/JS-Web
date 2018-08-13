import React, { Component } from 'react';
import '../../style/post.css';

import ReqHandler from '../../utils/ReqHandler';
import Post from './Post';

class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myPosts: []
        }
    }

    componentDidMount() {
        let user = localStorage.getItem('username');
        ReqHandler.myPosts(user).then(data => {
            data.map((p, i) => p.index = i + 1)
            this.setState({myPosts: data});
        })
    }

    render () {
        return  (
            <section id="viewMyPosts">
                <div className="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div className="posts">
                    {localStorage.getItem('token') !== undefined 
                    ? this.state.myPosts.length !== 0
                    ? this.state.myPosts.map(post => {
                        return <Post key={post._id} props={post} /> 
                    }) : <center><h1>You have no posts created!</h1></center> : ''}
                </div>
            </section>
        )
    }
};

export default MyPosts;