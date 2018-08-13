import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SingUpForm from './components/form/SingUpForm';
import LoginForm from './components/form/LoginForm';
import CreatePokemon from './components/form/CreatePokemon';
import DisplayPokemons from './components/form/DisplayPokemons';

class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      token: ''
    }

    //function for send user data to localStorage
    this.autenticate = (data) => {
      if(data.success) {
        this.setState({token:data.token, username: data.user.name})
        localStorage.setItem("token", data.token);
      }
    }
  }

  componentDidMount() {
    this.setState({token:localStorage.getItem("token")});
  }

  render() {
    if(this.state.token !== "undefined" && typeof(localStorage.token) !== "undefined" && this.state.token !== '') {
      return (
        <div>
          <CreatePokemon />
          <DisplayPokemons />
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Pokemons</h1>
        </header>
        <div>
          <SingUpForm />
          <LoginForm authFunc={this.autenticate}/>
        </div>
      </div>
    );
  }
}

export default App;
