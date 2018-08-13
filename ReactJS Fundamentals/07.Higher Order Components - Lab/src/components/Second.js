import React, { Component } from 'react';
import withLogging from '../helpers/withLogging';

class SecondBase extends Component {
    render() {
        return (
            <div>
                Second
            </div>
        )
    }
}

const Second = withLogging(SecondBase)

export default Second;