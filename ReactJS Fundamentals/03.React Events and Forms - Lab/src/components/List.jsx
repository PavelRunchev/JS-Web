import React, { Component } from 'react';

export default class List extends Component {
    render () {
            return (
                <div>
                    <ul>
                        {this.props.items.map(i => <li key={i.id}>{i.name}</li>)}
                    </ul>
                </div>
            )
    }
}