
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import ReqHandler from '../utils/ReqHandler';
import toastr from 'toastr';

class Logout extends Component {
    componentDidMount() {
        ReqHandler.logout().then(() => {
            toastr.success('Logout successfully');
            localStorage.clear();
            window.location.reload();
        });
    }

    render = () => <Redirect to='/' />
};

export default withRouter(Logout);