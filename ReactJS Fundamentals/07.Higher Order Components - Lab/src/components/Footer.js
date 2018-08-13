import React, { Component } from 'react';
import withLogging from '../helpers/withLogging';
import './Footer.css';

class FooterBase extends Component {
    render() {
        let footerMessage = this.props.message || <p>2018 RAIDERS TEAM</p>;
        return (
            <div className='footer'>
               {footerMessage}
            </div>
        )
    }
}

FooterBase.displayName = 'Footer';

const Footer = withLogging(FooterBase);


export default Footer;