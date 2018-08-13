import React from 'react';
import './App.css';
import Counter from './Counter';

const App = () => (
      <div className="App">
        <header className="App-header">     
          <div className="App-timer">
          <h1>Live Timing</h1>      
          <h1 className="App-time">{new Date(Date.now()).toLocaleTimeString()}</h1>
        </div>
        </header>
        
        <div className="App-Counter">
          <p>{Counter()}</p>
        </div>
        <h1 className="App-title">React JS</h1>
      </div>
)

export default App;
