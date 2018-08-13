import React, { Component } from 'react';
import './App.css';

import Slider from './components/Slider/Slider';
import Characters from './components/Characters/Characters';

class App extends Component {
    constructor() {
        super();
        this.state = { image: {id: 0}}
    }
    render() {
        return (
            <div className="container">
                <h1>React Components</h1>
                <Slider />
                <Characters />
            </div>
        );
    }
}

export default App;
