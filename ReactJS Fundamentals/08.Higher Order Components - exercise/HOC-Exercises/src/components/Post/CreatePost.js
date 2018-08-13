import React, { Component } from 'react';
import '../../style/submit.css';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';

import ReqHandler from '../../utils/ReqHandler';

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: '',
            title: '',
            url: '',
            imageUrl: '',
            description: '',
            isRedirect: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ error: false});
    }

    onSubmit(e) {
        e.preventDefault();
        if(localStorage.getItem('username') === null) {
            return toastr.warning('required be logged user!');
        }
        let author = localStorage.getItem('username');
        let url = this.state.url;
        let title = this.state.title;
        let imageUrl = this.state.image;
        let comment = this.state.comment;

        if(author === undefined || author.length === '') {
            return toastr.warning('required be logged user for create Post!');
        }

        if(title === '' || url === '' || comment === '') {
            toastr.warning('Fields cannot be empty for created post!');
            return;
        }
      
        let newPost = {
            author,
            url,
            title,
            imageUrl,
            description: comment
        }

        ReqHandler.createPost(newPost).then(() => {
            toastr.success('Created post successfully');
            this.setState({isRedirect: true})
        }).catch(err => console.log(err.message));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    render () {
        if(this.state.isRedirect) {
            return (
                <Redirect to="/catalog" />
            )
        }

    return ( 
            <section id="viewSubmit">
                <div className="submitArea">
                    <h1>Create Post</h1>
                    <p>Please, fill out the form. A thumbnail image is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="submitForm" className="submitForm" onSubmit={this.onSubmit}>
                        <label>Link URL:</label>
                        <input name="url" type="text" onChange={this.onChange}/>
                        <label>Link Title:</label>
                        <input name="title" type="text" onChange={this.onChange}/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="image" type="text" onChange={this.onChange}/>
                        <label>Comment (optional):</label>
                        <textarea name="comment" onChange={this.onChange}></textarea>     
                        <input id="btnSubmitPost" value="Submit" type="submit" />
                    </form>
                </div>
            </section>
        )
    }
};

export default CreatePost;
