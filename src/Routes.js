import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//pages and custom components
import Homepage from './pages/Homepage';
import AddEvent from './pages/AddEvent';
import AddVenue from './pages/AddVenue';
import ShowEvents from './pages/ShowEvents';
import ShowVenues from './pages/ShowVenues';
import Callack from './common/Callback';
import NotFound from './pages/NotFound';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Homepage}/>
                <Route path='/events' component={ShowEvents}/>
                <Route path='/venues' component={ShowVenues}/>
                <Route path='/callback' component={Callack}/>
                <Route path='/add-venue' component={AddVenue}/>
                <Route path='/add-event' component={AddEvent}/>
                <Route path='*' component={NotFound} />
            </Switch>
        );
    }
}

export default Routes;