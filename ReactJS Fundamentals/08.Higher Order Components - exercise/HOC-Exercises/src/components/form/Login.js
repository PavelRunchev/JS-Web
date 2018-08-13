import React, { Component} from 'react';
import ReqHandler from '../../utils/ReqHandler';
import { withRouter } from 'react-router-dom';
import toastr from 'toastr';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLogin: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        if(username === '' || password === '') {
            toastr.warning("Fields should be not empty!");
            return;
        }

        let user = {
            username,
            password
        }

        ReqHandler
            .login(user)
            .then(data => {
                localStorage.setItem('token', data._kmd.authtoken);
                localStorage.setItem('username', data.username);
                localStorage.setItem('id', data._id);
                //check is admin!!!
                if(data._kmd.roles.length > 0) {
                    console.log("is Admin");
                } else {
                    console.log("user");
                }

                this.setState({error: ''});
               window.location.reload();
            })
            .catch(err => console.log(err.message));
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div>
                <form id="loginForm" onSubmit={this.onSubmit}>
                    <h2>Sign In</h2>
                    <label>Username:</label>
                    <input  onChange={this.onChange} name="username" type="text" />
                    <label>Password:</label>
                    <input onChange={this.onChange} name="password" type="password" />
                    <input id="btnLogin" value="Sign In" type="submit" />           
                </form>
            </div>
        )
    }
}

export default withRouter(Login);