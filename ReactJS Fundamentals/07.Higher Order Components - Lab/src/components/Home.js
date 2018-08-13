import React, { Component } from 'react';
import withLogging from '../helpers/withLogging';
import preloader from './Preloader';

preloader();

class HomeBase extends Component {
    render() {
        let homeMessage = this.props.message || 'Home';
        return (
            <div>
               {homeMessage}
            </div>
        )
    }
}

HomeBase.displayName = 'Home';

const Home = withLogging(HomeBase);


export default Home;