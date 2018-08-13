import React from 'react';
import DateConvertor from '../../utils/DateConvertor';
import { Link } from 'react-router-dom';

let Comment = props => {

        let ownerComment = <Link to={`/deleteComment/${props.props._id}`} className="deleteLink">delete</Link>;
        return (
            <article className="post post-content">
                <p>{props.props.content}</p>
                <div className="info">
                    submitted {DateConvertor(props.props._kmd.ect)} by {props.props.author} 
                    | {props.props.author === localStorage.getItem('username') ? ownerComment : ''}
                </div>
            </article>
        )
}

export default Comment;