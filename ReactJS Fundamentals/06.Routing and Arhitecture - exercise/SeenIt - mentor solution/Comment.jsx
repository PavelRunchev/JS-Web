import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import requester from '../../utils/requester';
import observer from '../../utils/observer';
import calcTime from '../../utils/time';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.OnDeleted = this.OnDeleted.bind(this);
    }

    OnDeleted(ev) {
        let id = ev.target.attributes['data-id'].value;
        requester.remove('appdata', `comments/${id}`, 'Kinvey').then(res => {
            this.props.isDeleted(true);
            observer.trigger(observer.events.notification, {
                type: 'success',
                message: 'Comment deleted.'
            });
            // this.props.history.push('/');
            // this.props.history.push(`/comments/${this.props.postId}`);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { id, content, author, time } = this.props;
        const isAuthor = author === localStorage.getItem("username");
        return (
            <article className="comment">
                <div className="comment-content">
                    {content}
                    <div className="info">
                        submitted {calcTime(time)} ago by {author}
                    </div>
                </div>
                {isAuthor && <a href="javascript:void(0);" className="action" data-id={id} onClick={this.OnDeleted}>[Delete]</a>}
            </article>
        )
    }
}

export default withRouter(Comment)