import React, { Component } from 'react';

import validateFunc from '../utils/formValidator';
import Input from './formFields/Input';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    submitLogin(e) {
        //not refresh
        e.preventDefault();
        let payload = {
            email: this.state.email,
            password: this.state.password
        }

        this.loginUser(payload);
    }

    loginUser(payload) {
        fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)

    })
      .then(res => {
        return res.json()
      })
      .then(d => {
          //send to localStorage in browser
          this.props.authFunc(d);
          window.location.reload();
      });
    }

    render () {
        let validateObj = validateFunc(
            this.state.email,
            this.state.email,
            'P',
            this.state.password,
            this.state.password,
            
        )

        return (
            <form onSubmit={this.submitLogin.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                    <h2>Login</h2>
                    <Input
                        type='text'
                        data='email'
                        name='Email'
                        func={e => {
                        this.setState({ email: e.target.value })
                        }}
                        valid={validateObj.validMail}
                    />
                    <Input
                        type='password'
                        data='password'
                        name='Password'
                        func={e => {
                        this.setState({ password: e.target.value })
                        }}
                        valid={validateObj.validPassword}
                    />
                    
                    <input
                        style={({ "display": validateObj.validPassword && validateObj.validMail === true ? '' : 'none' })}
                        type='submit'
                        value='Login'
                    />
                    </div>
                </fieldset>
            </form>
        )
    }
}


export default LoginForm;
