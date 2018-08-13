import React, { Component } from 'react';

export default class ButtonWithClick extends Component {
    constructor(props) {
        super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick (event) {
        //display button in console
        console.log(event.target);
        console.log(this.props.name);
    }

    render () {
        return (
            <button onClick={this.onButtonClick}>Click me!</button>
        )
    }
}