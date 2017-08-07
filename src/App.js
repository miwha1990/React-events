import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Container from 'muicss/lib/react/container'
//pages and custom components
import AppHeader from './common/Header';
import Routes from './Routes';

class Main extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <AppHeader/>
                  <Container>
                      <Routes/>
                  </Container>
              </div>
          </Router>
      </div>
    );
  }
}

export default Main;
