import React, { Component } from 'react';
import Navigation from '../common/Navigation';
import Details from '../post/Details';
import CreateComment from './CreateComment';
import Comment from './Comment';

import requester from '../../utils/requester';
import observer from '../../utils/observer';

class DetailsPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            comments: [],
            isLoaded: false,
            status: false
        }

        this.isCommentListChanged = this.isCommentListChanged.bind(this);
    }

    isCommentListChanged(status) {
        this.setState({ status });
        let id = this.props.match.params.id;
        requester.get('appdata', `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, 'Kinvey').then(comments => {
            this.setState({ comments, isLoaded: true, status: false });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        requester.get('appdata', `posts/${id}`, 'Kinvey').then(post => {
            requester.get('appdata', `comments?query={"postId":"${id}"}&sort={"_kmd.ect": -1}`, 'Kinvey').then(comments => {
                this.setState({ post, comments, isLoaded: true, status: false });
            }).catch(err => {
                observer.trigger(observer.events.notification,
                    { type: 'error', message: err.responseJSON.description });
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const post = this.state.post;
        const isAuthor = post.author === localStorage.getItem("username");
        let postId = this.props.match.params.id;

        if (!this.state.isLoaded) {
            return (
                <div id="loadingBox" className="notification" >
                    <span>Loading...</span>
                </div>
            )
        }

        // if (Object.keys(post).length === 0 && post.constructor === Object) {
        //     return (
        //         <div id="errorgBox" className="notification" >
        //             <span>Error</span>
        //         </div>
        //     )
        // }

        let comments = this.state.comments || [];

        let hasComments;
        if (comments.length === 0) {
            hasComments = (
                <div>
                    <h3> No comments in database.</h3>
                </div>
            )
        }

        return (
            <div>
                <Navigation />
                <Details post={this.state.post} isAuthor={isAuthor} />
                <CreateComment postId={this.props.match.params.id} isCreated={this.isCommentListChanged} />
                {hasComments
                    ? hasComments
                    : <div id="allComments" className="comments">
                        {comments.map((c, i) => {
                            return <Comment
                                key={c._id}
                                id={c._id}
                                content={c.content}
                                author={c.author}
                                time={c._kmd.ect}
                                postId={postId}
                                isDeleted={this.isCommentListChanged}
                            />
                        })}
                    </div>}
            </div>
        )
    }
}

export default DetailsPost;
