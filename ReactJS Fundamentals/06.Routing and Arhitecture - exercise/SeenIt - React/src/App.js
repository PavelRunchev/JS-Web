import React, { Component } from 'react';
import './App.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import GuestHome from './components/GuestHome';
import Home from './components/Home';
import Notification from './components/common/Notification';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState({token: localStorage.getItem('token')});
    }
  }


  render() {
    return (
      <div className="App">    
          <Header />
          <Notification />
          {this.state.token !== '' ? <Home /> : <GuestHome />}
          <Footer />
      </div>
    );
  }
}

export default App;
