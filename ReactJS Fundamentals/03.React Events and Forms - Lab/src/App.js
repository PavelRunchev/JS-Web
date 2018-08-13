import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ButtonWithClick from './components/ButtonWithClick.jsx';
import RegisterForm from './components/RegisterForm';
import Container from './components/Container.jsx';
import ToggleButton from './components/ToggleButton.jsx';
import FocusDiv from './components/FocusDiv.jsx';
import Form from './components/Form.jsx';
import Converter from './components/Converter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div>
          <ButtonWithClick name='Random Button'/>
        </div>
        <br />
        <div>
          <RegisterForm />
        </div>
        <div>
          <Container />
        </div>
        <br />
        <div>
          <ToggleButton />
        </div>
        <br />
        <div>
          <FocusDiv number="1" />
          <FocusDiv number="2" />
          <br />
          <FocusDiv number="3" />
          <FocusDiv number="4" />
        </div>
        <br />
        <div>
          <Form />
        </div>
        <br />
        <div>
          <Converter />
        </div>
        <br />
      </div>
    );
  }
}

export default App;
