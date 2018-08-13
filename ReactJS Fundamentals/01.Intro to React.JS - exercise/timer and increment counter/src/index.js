
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

setInterval(() => {
    ReactDOM.render(App(), document.getElementById('root'));
}, 1000);


