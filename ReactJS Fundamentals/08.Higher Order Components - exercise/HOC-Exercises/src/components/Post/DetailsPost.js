import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Comment from '../Comment/Comment';
import ReqHandler from '../../utils/ReqHandler';
import DateConvertor from '../../utils/DateConvertor';
import toastr from 'toastr';

//when display created post
let createTimeAgo;

class DetailsPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPost: {},
            comments: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.viewDetails();
    }

    viewDetails() {
        let postId = this.props.match.params.id;

        if(postId !== null) {
            ReqHandler.detailsPost(postId).then(curPost => {
                this.setState({currentPost: curPost});
                createTimeAgo = curPost._kmd.ect;
                ReqHandler.myComments(postId).then(allcomments => {
                    this.setState({comments: allcomments});
                }).catch(err => console.log(err.message));
            }).catch(err => console.log(err.message));
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let author = localStorage.getItem('username');
        let content = this.state.content;
   
        let postId = this.props.match.params.id;

        if(content === ''){
            this.setState({ error: 'Field not be empty to added Comment!'});
            return;
        }

        let newComment = {
            postId: postId,
            author: author,
            content: content,
        }

        ReqHandler.createComment(newComment).then(comm => {
            toastr.success('Created comment successfully');
            let newComments = this.state.comments;
            newComments.unshift(comm);
            this.setState({comments: newComments});
        }).catch(err => console.log(err.message));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        let navigation =  
        <div className="controls">
            <ul>
                <li className="action"><Link className="editLink" to={`/editPost/${this.state.currentPost._id}`}>edit</Link></li>
                <li className="action"><Link className="deleteLink" to={`/deletePost/${this.state.currentPost._id}`}>delete</Link></li>
            </ul>
        </div>;

        return(
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href={this.state.currentPost.url}>
                            <img src={this.state.currentPost.imageUrl} alt=""/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href={this.state.currentPost.url}>
                                {this.state.currentPost.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.currentPost.description}</p>
                            <div className="info">
                                submitted {DateConvertor(createTimeAgo)} by {this.state.currentPost.author}
                            </div>
                           
                            {this.state.currentPost.author === localStorage.getItem('username') ? navigation : ''}
                        </div>
                        
                    </div>
                    <div className="clear"></div>
                    
                </div>
                <div className="post post-content">
                    <form id="commentForm" onSubmit={this.onSubmit}>
                        <label>Comment</label>
                        <textarea name="content" type="text" onChange={this.onChange}></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment"/>
                    </form>
                </div>

                {this.state.comments.map(c => {
                    return <Comment key={c._id} props={c} postId={this.props.match.params.id} comments={this.state.comments}/>
                })}
            </section>
        )
    }
}

export default DetailsPost;