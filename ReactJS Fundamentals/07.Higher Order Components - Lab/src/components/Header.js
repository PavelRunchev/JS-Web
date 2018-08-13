import React, { Component } from 'react';
import withLogging from '../helpers/withLogging';
import './Header.css';

class HeaderBase extends Component {
    render() {
        let headerMessage = this.props.message || <h1>Header</h1>;
        return (
            <div className='Header'>
               {headerMessage}
            </div>
        )
    }
}

HeaderBase.displayName = 'Header';

const Header = withLogging(HeaderBase);


export default Header;