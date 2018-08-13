import React, { Component } from 'react';
import './Preloader.css';

export default function preloader(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                ready: false,
                data: []
             };
        }

        componentDidMount() {
            this.props.request().then(data => this.receiveData(data));
        }

        receiveData(data) {
            this.setState({ready: true, data });
        }

        render() {
            if(this.state.ready) {
                return <WrappedComponent data={this.state.data} {...this.props} />;
            }

            return (
                <div className="loading"><h1>Loading&hellip;</h1></div>
            )
        }
    }
}