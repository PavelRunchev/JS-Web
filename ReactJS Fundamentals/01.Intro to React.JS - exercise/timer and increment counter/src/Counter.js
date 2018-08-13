import React from 'react';
import './App.css';

let counter = 0;

const incrementCounter = () => {
    counter++;
};

const zeroCounter = () => {
    counter = 0;
}

const Counter = () => (
    <div className="App-counter">
        <h1 className="App-title">Increment Counter</h1>
        <h1>{counter}</h1>
        <button onClick={incrementCounter}>Clicked Counter</button>
        <button onClick={zeroCounter}>Reset Counter</button>
    </div>
);


export default Counter;