import { Component } from 'react';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';

class DeleteComment extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        if(id !== null || id !== undefined) {
            ReqHandler.deleteComment(id).then(() => {
                toastr.success('Deleted comment successfully');
                this.props.history.push('/catalog');
            }).catch(err => console.log(err.message));
        }
    }

    render () {
        return ('');
    }
}

export default withRouter(DeleteComment);