import React, { Component } from 'react';
import toastr from 'toastr';

toastr.options.newestOnTop = false;
toastr.options.closeButton = true;

function notify(type, message, errors) {
  if (type === 'success') {
    toastr.success(message);
  }

  if (type === 'error') {
    toastr.error(message);

    if (errors) {
      for (let err in errors) {
        toastr.error(errors[err]);
      }
    }
  }
}

const withFormHandling = (WrappedComponent) =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleFormSubmit(e) {
      e.preventDefault();

      let validationResult = this.props.validateFunc(this.state);

      if (validationResult.success) {
        notify('success', 'Action completed Successfuly!');
        this.props.history.push('/');
      } else {
        this.setState({
          error: 'alert'
        });
        notify('error', validationResult.message, validationResult.errors);
      }
    }

    render() {
      return (
        <WrappedComponent
          handleChange={this.handleChange}
          handleFormSubmit={this.handleFormSubmit}
          error={this.state.error}
        />
      );
    }
  };

export default withFormHandling;