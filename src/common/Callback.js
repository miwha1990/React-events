import { Component } from 'react';
import queryString from 'querystring';
import oauthService from './oauthService';
class Callback extends Component {
    constructor(props) {
        super(props);
        const query = queryString.parse(this.props.location.search);
        oauthService.accessToken(query)
    }

    render() {
        return null;
    }
}

export default Callback;