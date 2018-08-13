import React, { Component } from 'react';
import './FocusDiv.css';

export default class FocusDiv extends Component {
    constructor (props) {
        super (props);

        this.state = {
            active: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        this.setState({active: true});
    }

    onMouseLeave() {
        this.setState({active: false});
    }

    render () {
        let currentClass = 'focusDiv';
        if(this.state.active) {
            currentClass += ' active';
        }

        return (
            <div className={currentClass}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                <p>This is div number {this.props.number}</p>
            </div>
        )
    }
}