import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemForm extends Component {
    static propTypes = {
        name: PropTypes.string
    }
    constructor (props) {
        super(props);

        this.state = {
            itemName: ''
        }

        this.onInputChanged = this.onInputChanged.bind(this);
        this.onItemSaved = this.onItemSaved.bind(this);
    }

    onInputChanged (event) {
        this.setState({
            itemName: event.target.value
        });
    }

    onItemSaved(event) {
        event.preventDefault();

        if(this.state.itemName === '') {
            return;
        }
        this.props.addItem(this.state.itemName);
    }


   render () {
       return (
            <form onSubmit={this.onItemSaved}>
                Item Name:
                <input 
                    type='text' 
                    name='name'
                    onChange={this.onInputChanged}
                    value={this.state.itemName}
                    />

                <input type='submit' value='Submit'/>
            </form>
       )
   }
}



