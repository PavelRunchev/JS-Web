import React, { Component } from 'react';
import '../../style/notifications.css';

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            info: '',
            error: '',
            loading: ''
        }
    }

    render () {
        let notificationId;
        if(this.state.success) {
            return (
                <div id="notifications">
                    <div id={notificationId} className="notification"><span>{this.state.message}</span></div>
                </div>
            )
        } else if (this.state.error) {
            return (
                <div id="notifications">
                    <div id={notificationId} className="notification"><span>{this.state.message}</span></div>
                </div>
            )
        } else if (this.state.loadin) {
            return (
                <div id="notifications">
                    <div id={notificationId} className="notification"><span>{this.state.message}</span></div>
                </div>
            )
        }
        
        return null;
    }
}

export default Notification;