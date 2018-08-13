import React, { Component } from 'react';
import Post from './Post';
import ReqHandler from '../../utils/ReqHandler';
import toastr from 'toastr';


class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        toastr.info("Loading ...");
        ReqHandler.allPosts().then(data => {
            //new property index in array from posts!!!
            data.map((p, i) => p.index = i + 1)
            this.setState({posts: data});

        });
    }

    render () {
        return  (
                <section id="viewCatalog">
                    {this.state.allPosts}
                    <div className="posts">
                        {this.state.posts.map(post=> {
                            return <Post key={post._id} props={post} />
                        })}
                    </div>
                </section>
        )
    }
};

export default Catalog;