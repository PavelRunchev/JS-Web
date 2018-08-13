import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class DeletePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRedirectToCatalog: false
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
 
        if(id !== null) {
            ReqHandler.deletePost(id).then(() => {
                toastr.success('Deleted post successfully');
                this.setState({isRedirectToCatalog: true});
            }).catch(err => console.log(err.message));
        }
    }

    render () {
        if(this.state.isRedirectToCatalog) {
            return (
                <Redirect to='/catalog' />
            )
        }

        return (
            ''
        )
    }
}

export default DeletePost;