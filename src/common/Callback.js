import React, { Component } from 'react';
import queryString from 'querystring';
import oauthService from './oauthService';
class Callback extends Component {
    constructor(props) {
        super(props);
        const query = queryString.parse(this.props.location.search);
        console.log(query);
        const requestParams = oauthService.request_params;
        const queryUrl = `oauth_consumer_key=${oauthService.consumer.key}` +
        `&oauth_nonce=${requestParams.oauth_nonce}` +
        `&oauth_signature=${requestParams.oauth_signature}` +
        `&oauth_signature_method=HMAC-SHA1` +
        `&oauth_timestamp=${requestParams.oauth_timestamp}` +
        `&oauth_token=${query.oauth_token}` +
        `&oauth_verifier=${query.oauth_verifier}` +
            `&oauth_version=1.0 HTTP/1.1`;
        console.log(queryUrl);
    }

    render() {
        return null;
    }
}

export default Callback;
