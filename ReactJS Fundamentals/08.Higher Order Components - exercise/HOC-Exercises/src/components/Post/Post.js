import React from 'react';
import { Link } from 'react-router-dom';

import DateConvertor from '../../utils/DateConvertor';

let Post = props => {
    let navigationEdit =  
                <li className="action"><Link className="editLink" to={`/editPost/${props.props._id}`}>edit</Link></li>;
    let navigationDelete =
                <li className="action"><Link className="deleteLink" to={`/deletePost/${props.props._id}`}>delete</Link></li>;
;

    return (
        <article className="post">
            <div className="col rank">
                <span>{props.props.index}</span>
            </div>
            <div className="col thumbnail">
                <a href={props.props.url}>
                    <img src={props.props.imageUrl} alt=""/>           
                </a>
            </div>
            <div className="post-content">
                <div className="title">
                    <a href={props.props.url}>
                        {props.props.title}
                    </a>
                </div>
                <div className="details">
                    <div className="info">
                        submitted {DateConvertor(props.props._kmd.ect)} by {props.props.author}
                    </div>
                    
                    <div className="controls">
                        <ul>
                            <li className="action"><Link className="commentsLink" to={`/detailsPost/${props.props._id}`}>details</Link></li>
                            {props.props.author === localStorage.getItem('username') ? navigationEdit : ''}
                            {props.props.author === localStorage.getItem('username') ? navigationDelete : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Post;