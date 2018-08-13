import React, { Component } from 'react';
import List from './List.jsx';
import ItemForm from './ItemForm.jsx';

export default class Container extends Component {
    constructor (props) {
        super(props);

        this.state = {
            items: []
        }

        this.addItem = this.addItem.bind(this);
    }

    addItem(name) {
        this.setState(prevState =>{
            let items = prevState.items
            items.push({
                id: items.length + 1,
                name: name
            })

            return { items }
        })
    }

    render () {
        return (
            <div>
                <h1>My Page</h1>
                <div>
                    <List items={this.state.items}/>
                </div>
                <div>
                    <ItemForm addItem={this.addItem}/>
                </div>                
            </div>
        )
    }
}