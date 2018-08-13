import React, { Component} from 'react';
import toastr from 'toastr';
import ReqHandler from '../../utils/ReqHandler';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        let repeatPass = this.state.repeatPass;

        const usernamePattern = /^[A-Za-z]{3,}$/;
        const passwordPattern = /^[A-Za-z0-9]{6,}$/;
        //validation
        if(!usernamePattern.test(username)) {
            toastr.warning("Username should be least 3 characters!");
            return;
        }

        if(!passwordPattern.test(password)) {
            toastr.warning('Password should be at least 6 characters!');
            return;
        }

        if(repeatPass !== password) {
            toastr.warning('Both password must match!');
            return;
        };

        let user = {
            username,
            password
        };
        
        ReqHandler.register(user).then(data => {
            localStorage.setItem('token', data._kmd.authtoken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('id', data._id);
            this.setState({error: ''});
            window.location.reload();
        }).catch(err => console.log(err));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div>
                <form id="registerForm" onSubmit={this.onSubmit} >                   
                    <h2>Register</h2>
                    <label>Username:</label>
                    <input onChange={this.onChange} name="username" type="text" />
                    <label>Password:</label>
                    <input onChange={this.onChange} name="password" type="password" />
                    <label>Repeat Password:</label>
                    <input onChange={this.onChange} name="repeatPass" type="password" />
                    <input id="btnRegister" value="Sign Up" type="submit" />           
                </form>
            </div>
        )
    }
}

export default Register;