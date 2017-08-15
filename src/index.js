import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Getlocation from './common/GetGeoLocation';
import {createStore } from 'redux';
function currentLocation(state = '') {
    return state;
}
// const store = createStore(currentLocation());

injectTapEventPlugin();
const AppLoad = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
);
ReactDOM.render(<AppLoad/>, document.getElementById('root'));
registerServiceWorker();
