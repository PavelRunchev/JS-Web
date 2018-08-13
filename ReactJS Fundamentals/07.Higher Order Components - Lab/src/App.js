import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Second from './components/Second';

import Data from './components/Data';
import Header from './components/Header';
import Footer from './components/Footer';
//simulation any data
import Request from './components/Requester';

class App extends Component {
  render() {
    return (
      <div className="App">
       <div>
          <Header />
          <Home message='Custom message'/>
          <Second />
          <Data request={Request}/>
          <Footer />
       </div>
      </div>
    );
  }
}

export default App;
