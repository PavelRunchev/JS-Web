import React from 'react';
import withForm from './withForm';

const RegisterFormBase = (props) => {
  return (
    <div className={props.error}>
      <div id="register-form" className={props.error}>
        <header>
          <span className="title">Register</span>
        </header>
        <form onSubmit={props.handleFormSubmit}>
          Username:
          <input type="text" name="username" onChange={props.handleChange} />
          <br /> Email:
          <input type="text" name="email" onChange={props.handleChange} />
          <br /> Password:
          <input type="password" name="password" onChange={props.handleChange} />
          <br /> Repeat Password:
          <input type="password" name="confirmedPassword" onChange={props.handleChange} />
          <br />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

const RegisterForm = withForm(RegisterFormBase);

export default RegisterForm;