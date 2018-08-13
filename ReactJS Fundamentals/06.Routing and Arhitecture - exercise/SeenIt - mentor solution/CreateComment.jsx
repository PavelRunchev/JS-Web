import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import requester from '../../utils/requester';
import observer from '../../utils/observer';

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }

        this.onChanged = this.onChanged.bind(this);
        this.onSubmited = this.onSubmited.bind(this);
    }

    onChanged(ev) {
        this.setState({ [ev.target.name]: ev.target.value });
    }

    onSubmited(ev) {
        ev.preventDefault();

        let comment = {
            postId: this.props.postId,
            content: this.state.content,
            author: localStorage.getItem('username')
        };

        requester.post('appdata', 'comments', 'Kinvey', comment).then(res => {
            observer.trigger(observer.events.notification, { type: 'success', message: 'Comment created.' });
            this.props.isCreated(true);
            this.setState({ content: '' });
            // this.props.history.push('/');
            // this.props.history.push(`/comments/${this.props.postId}`);
        }).catch(err => {
            observer.trigger(observer.events.notification,
                { type: 'error', message: err.responseJSON.description });
        });
    }

    render() {
        return (
            <div>
                <div className="submitArea">
                    <h1>Post Comment</h1>
                    <form id="createCommentForm" className="submitForm" onSubmit={this.onSubmited}>
                        <label>Content:</label>
                        <textarea id="cmtContent" name="content" type="text" value={this.state.content} onChange={this.onChanged} />
                        <input type="submit" value="Post Comment" />
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateComment);