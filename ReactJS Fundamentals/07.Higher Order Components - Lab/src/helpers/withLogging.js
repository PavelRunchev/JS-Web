import React, { Component } from 'react';

let withLogging = WrappedComponent => 
    class extends Component {
        componentDidMount() {
            console.log(`${WrappedComponent.displayName || WrappedComponent.name} ready!`);
        }
        render () {
            return <WrappedComponent {...this.props}/> 
        }
    }


export default withLogging;