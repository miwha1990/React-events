import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages and custom components
import Homepage from './pages/Homepage';
// import AddEvent from './pages/AddEvent';
import ShowEvents from './pages/ShowEvents';
import SearchEvents from './pages/SearchEvents';
import NotFound from './pages/NotFound';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Homepage}/>
                <Route path='/events' component={ShowEvents}/>
                <Route path='/search-events' component={SearchEvents}/>
                <Route path='*' component={NotFound} />
            </Switch>
        );
    }
}

export default Routes;