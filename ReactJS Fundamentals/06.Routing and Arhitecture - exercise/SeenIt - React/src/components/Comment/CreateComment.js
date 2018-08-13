import React, { Component } from 'react';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            error: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let author = localStorage.getItem('username');
        let content = this.state.content;
        //get postId from DetailsPost.js (67 row   <CreateComment component={this.props.match.params.id}/>)
        let postId = this.props.component.match.params.id;

        if(content === ''){
            this.setState({ error: 'Field not be empty to added Comment!'});
            return;
        }

        let newComment = {
            postId: postId,
            author: author,
            content: content,
        }

        ReqHandler.createComment(newComment).then(() => {
            toastr.success('Created comment successfully');
            this.props.component.history.push("/catalog");
        }).catch(err => console.log(err.message));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div className="post post-content">
                    <strong><p>{this.state.error}</p></strong>
                    <form id="commentForm" onSubmit={this.onSubmit}>
                        <label>Comment</label>
                        <textarea name="content" type="text" onChange={this.onChange}></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment"/>
                    </form>
            </div>
        )
    }
}

export default CreateComment;