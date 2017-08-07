import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
const AppLoad = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
);
ReactDOM.render(<AppLoad/>, document.getElementById('root'));
registerServiceWorker();
