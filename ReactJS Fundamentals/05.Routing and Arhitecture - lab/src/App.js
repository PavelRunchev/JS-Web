import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Link } from 'react-router-dom';

const About = ({match}) => (
  <div>
    <h1>About Page</h1>
    <Link to="/about/contact">Contact </Link>
    <Route path={match.url + '/contact'} component={Contact} />
  </div>
)

const Home = props => (
  <div>
    <h1>Home Page</h1>
    <p>React JS</p>
    <p>SoftUni</p>
  </div>
)

const DashBoard = props => {
    <div>
      <h1>Your Dashboard</h1>
    </div>
}

const Contact = ({match}) => (
  <div>
    <h1>Contact Nested Page</h1>
    <p>React JS</p>
    <Link to="/about/contact/details">Details </Link>
    <Route path={match.url + '/details/:userName'} component={User} />
    <p>Front-End</p>
  </div>
)

const User = props => (
  <div>
    <h1>User Details</h1>
    <p>Display details for {props.match.params.userName}</p>
    <p>Front-End</p>
    <p>SoftUni</p>
  </div>
)

const NotFound = props => (
  <div>
    <h1>Not Found Page</h1>
    <h1>ERROR 404</h1>
    <p>React JS</p>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: false}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to our website!</h1>
        </header>
        <div className="App-intro">

          <Header />
          <Switch>
            <Route exact path="/" render={() => {
              if(this.state.loggedIn) return (<Redirect to="/dashboaed" />);
              else return (<Home />);
            }} />
            <Route path="/dashboard" component={DashBoard} />     
            <Route path="/about" component={About} />           
            <Route component={NotFound} />
          </Switch>

        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
