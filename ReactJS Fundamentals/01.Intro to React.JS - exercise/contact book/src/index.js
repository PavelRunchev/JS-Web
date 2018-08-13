import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
const rerender = ReactDOM.render;

ReactDOM.render(App(), document.getElementById('root'));
export default rerender;
