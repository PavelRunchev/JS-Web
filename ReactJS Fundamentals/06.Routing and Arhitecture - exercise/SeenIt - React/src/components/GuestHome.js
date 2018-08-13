import React, { Component } from 'react';

import Login from './form/Login';
import Register from './form/Register';

class GuestHome extends Component {

    render () {
        return (
            <section id="viewWelcome">
                <div className="welcome">
                    <div className="signup">
                        <Login />
                        <Register />
                    </div>

                    <div className="about">
                        <h1>Welcome to SeenIt</h1>
                        <p>
                            Share interesting links and discuss great content. It's what's happening now.
                        </p>
                        <p>Sign in or sign up in a second.</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default GuestHome;