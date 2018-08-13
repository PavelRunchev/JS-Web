import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editPost: {},
            redirectTo: false,
            error: '',
            title: '',
            url: '',
            content: '',
            imageUrl: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
      
        if(postId !== null || postId !== undefined) {
            ReqHandler.detailsPost(postId).then(detailPost => {
                this.setState({editPost: detailPost});
            }).catch(err => console.log(err.message));
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let postId = this.props.match.params.id;
        let title = this.state.title;
        let url = this.state.url;
        let imageUrl = this.state.image;
        let content = this.state.description;

        if(title === '' || url === '') {
            return toastr.warning('Fields cannot be empty for edit the post!');
        }
    
        let newEditPost = {
            author: localStorage.getItem('username'),
            title,
            url,
            imageUrl,
            description: content
        }

        if(postId !== null || postId !== undefined) {
            ReqHandler.EditPost(postId, newEditPost).then(post => {
                toastr.success("Post edit successfuly");
                this.setState({redirectTo: true});
            }).catch(err => console.log(err.message));
        }           
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        if(this.state.redirectTo) {
            return (<Redirect to="/catalog" />)
        }

        return (
            <section id="viewEdit">
                <div className="submitArea">
                    <h1>Edit Post</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required!!!</p>
                </div>
                <div className="submitArea formContainer">
                    <h1>{this.state.error}</h1>
                    <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
                        <label>Link URL: {this.state.editPost.url}</label>
                        <input name="url" type="text" onChange={this.onChange}/>
                        <label>Link Title: {this.state.editPost.title}</label>
                        <input name="title" type="text" onChange={this.onChange}/>
                        <label>Link to Image: </label>
                        <input name="image" type="text"  onChange={this.onChange}/>
                        <label>Comment: </label>
                        <textarea name="description" onChange={this.onChange}></textarea>
                        <input id="btnEditPost" type="submit" value="Edit Post"/>
                    </form>
                </div>
            </section>
        )
    }
}

export default EditPost;