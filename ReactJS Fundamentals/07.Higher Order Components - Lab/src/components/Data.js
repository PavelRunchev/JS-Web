import React, { Component } from 'react';
import Preloader from './Preloader';

class DataBase extends Component {
    render() {
        return (
            <ul>
                {this.props.data.map(i => <img key={i.id} src={i.name} alt=''/>)}
            </ul>
        )
    }
}

const Data = Preloader(DataBase);

export default Data;