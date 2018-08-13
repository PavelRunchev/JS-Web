import React, { Component } from 'react';
import DateConvertor from '../../utils/DateConvertor';
import { withRouter } from 'react-router-dom';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        }

        this.onDeleted = this.onDeleted.bind(this);
    }

    componentDidMount() {
        this.state.comments;
    }

    onDeleted(e) {
        e.preventDefault();
        let postId = this.props.postId;
        let commId = this.props.props._id;

        if(commId !== null || commId !== undefined) {
            ReqHandler.deleteComment(commId).then(() => {
                let newcomments = this.props.comments;
                newcomments = newcomments.filter(c => c._id !== commId);
                this.setState({comments: newcomments});
                toastr.success('Deleted comment successfully');
                //this.props.history.push(`/detailsPost/${postId}`);
                window.location.reload();

            }).catch(err => console.log(err.message));
        }
    }
    render () {
        const comm = this.props.props;
        let ownerComment = <a href="javascript:void(0);" className="action" data-id={comm._id} onClick={this.onDeleted}> [delete] </a>;
        return (
           
            <article className="post post-content">
                <p>{comm.content}</p>
                <div className="info">
                    submitted {DateConvertor(comm._kmd.ect)} by {comm.author} 
                    | {comm.author === localStorage.getItem('username') ? ownerComment : ''}
                </div>
            </article>
        )
    }
}

export default withRouter(Comment);