import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Comment from '../Comment/Comment';
import ReqHandler from '../../utils/ReqHandler';
import DateConvertor from '../../utils/DateConvertor';
import CreateComment from '../Comment/CreateComment';
//when display created post
let createTimeAgo;

class DetailsPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPost: {},
            comments: []
        }
    }

    componentDidMount(){
        //get id from router
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
                    <CreateComment component={this.props}/>
                </div>

                {this.state.comments.map(com => {
                    return <Comment key={com._id} props={com} />
                })}
            </section>
        )
    }
}

export default DetailsPost;