import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const style = {
    position: 'fixed',
    bottom: 10,
    marginLeft: -25
};


class NotFound extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div align='center' justify='center'>
        <h2 strong={true}>404</h2>
        <h5>Oops...</h5>
        <p size='large' align='center'>
          It seems that you are in the wrong route. Please check your URL and
          try again.
        </p>
          <Link to="/">
              <FloatingActionButton style={style}>
                  <ActionHome/>
              </FloatingActionButton>
          </Link>
      </div>
    );
  }
}

export default NotFound;
