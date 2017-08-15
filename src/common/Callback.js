import { Component } from 'react';
import queryString from 'querystring';
import oauthService from './oauthService';
class Callback extends Component {
    constructor(props) {
        super(props);
        const query = queryString.parse(this.props.location.search);
        const requestParams = oauthService.request_token_params();
        const queryUrl = `oauth_consumer_key=${oauthService.consumer().key}` +
        `&oauth_nonce=${requestParams.oauth_nonce}` +
        `&oauth_signature=${requestParams.oauth_signature}` +
        `&oauth_signature_method=HMAC-SHA1` +
        `&oauth_timestamp=${requestParams.oauth_timestamp}` +
        `&oauth_token=${query['?oauth_token']}` +
        `&oauth_verifier=${query.oauth_verifier}` +
            `&oauth_version=1.0`;
        const access = oauthService.accessToken('http://eventful.com/oauth/access_token?'+queryUrl)

        console.log(access,'accesss ');
    }

    render() {
        return null;
    }
}

export default Callback;