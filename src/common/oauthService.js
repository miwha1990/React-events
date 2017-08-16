import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
export default {

    consumer() {
        return {
            key: 'a57e84727c7443a1e56b',
            secret: '335d0af5c1aba780e4a1'
        }
    },

    appKey(){return 'fttM848t8nfNDVN6'},

    requestTokenUrl(){return 'http://eventful.com/oauth/request_token'},
    accessTokenUrl(){return 'http://eventful.com/oauth/access_token'},

    request_token_params: function(url){
        const vm = this;

        const oauth = OAuth({
            consumer:vm.consumer(),
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
        const request_data = {
            url,
            method: 'POST',
            data: {
                oauth_callback: 'http://localhost:3000/callback'
            }
        };
        return oauth.authorize(request_data);
    },

    requestToken() {

        let request_params = this.request_token_params(this.requestTokenUrl());
        const requestUrl = `${this.requestTokenUrl()}?oauth_callback=${request_params.oauth_callback}&oauth_consumer_key=${request_params.oauth_consumer_key}&oauth_nonce=${request_params.oauth_nonce}&oauth_signature=${request_params.oauth_signature}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${request_params.oauth_timestamp}&oauth_version=1.0`;

        function getQueryVariable(variable, query) {
            const vars = query.split('&');
            for (let i = 0; i < vars.length; i++) {
                let pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) === variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }
        let myHeaders = new Headers();
        myHeaders.set('Authorization', 'OAuth oauth_consumer_key="'+this.consumer().key+'",oauth_timestamp="'+request_params.oauth_timestamp+'",oauth_signature_method="HMAC-SHA1",oauth_nonce="'+request_params.oauth_nonce+'",oauth_version="1.0",oauth_signature="'+request_params.oauth_signature+'"');
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        axios({
            method: 'post',
            url: requestUrl,
            headers: myHeaders
        })
            .then(response => {
                if( response.statusText ==='OK') {
                    let url = 'http://eventful.com/oauth/authorize?oauth_token='+getQueryVariable('oauth_token', response.data);
                    window.location.href = url;
                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    },
    accessToken(query) {

        const requestParams = this.request_token_params(this.accessTokenUrl());
        const queryUrl = `oauth_consumer_key=${this.consumer().key}` +
            `&oauth_nonce=${requestParams.oauth_nonce}` +
            `&oauth_signature=${decodeURIComponent(requestParams.oauth_signature)}` +
            `&oauth_signature_method=HMAC-SHA1` +
            `&oauth_timestamp=${requestParams.oauth_timestamp}` +
            `&oauth_token=${query['?oauth_token']}` +
            `&oauth_verifier=${query.oauth_verifier}` +
            `&oauth_version=1.0`;

        let myHeaders = new Headers();
        console.log(queryUrl);
        myHeaders.set('Authorization', 'OAuth oauth_consumer_key="'+this.consumer().key+'",oauth_timestamp="'+requestParams.oauth_timestamp+'",oauth_signature_method="HMAC-SHA1",oauth_nonce="'+requestParams.oauth_nonce+'",oauth_version="1.0",oauth_signature="'+requestParams.oauth_signature+'"');
        axios({
            method: 'post',
            url: queryUrl,
            headers: myHeaders
        })
            .then(response => {
                if( response.statusText ==='OK') {
                   return response;
                }
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }
}