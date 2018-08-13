import React from 'react';
import withForm from './withForm';

const LoginFormBase = (props) => {
  return (
    <div className={props.error}>
      <div id="login-form" className={props.error}>
        <header>
          <span className="title">Login</span>
        </header>
        <form onSubmit={props.handleFormSubmit}>
          Username:
          <input type="text" name="username" onChange={props.handleChange} />
          <br /> Password:
          <input type="password" name="password" onChange={props.handleChange} />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

const LoginForm = withForm(LoginFormBase);

export default LoginForm;