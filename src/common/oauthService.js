import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
export default {

    consumer() {
        return {
            key: '24d4f906d61a88890056',
            secret: '0309c818d57093ce0fc4'
        }
    },

    appKey(){return '3pdkMsPJgb2K8p3b'},

    requestTokenUrl(){return 'http://eventful.com/oauth/request_token'},
    accessTokenUrl(){return 'http://eventful.com/oauth/access_token'},

    generate_string_params: function(url, switcher){
        const vm = this;

        const oauth = OAuth({
            consumer:vm.consumer(),
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
        let request_data;
        if(switcher){
            request_data = {
                url,
                method: 'POST',
                data: {
                    oauth_callback: 'http://localhost:3000/callback'
                }
            };
        } else {
            request_data = {
                url,
                method: 'POST'
            };
        }

        return oauth.authorize(request_data);
    },

    requestToken() {

        let request_params = this.generate_string_params(this.requestTokenUrl(), true);
        const requestUrl = `${this.requestTokenUrl()}?`+
            `oauth_callback=${request_params.oauth_callback}&`+
            `oauth_consumer_key=${request_params.oauth_consumer_key}&`+
            `oauth_nonce=${request_params.oauth_nonce}&`+
            `oauth_signature=${request_params.oauth_signature}&`+
            `oauth_signature_method=HMAC-SHA1`+
            `&oauth_timestamp=${request_params.oauth_timestamp}`+
            `&oauth_version=1.0`;

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

         axios({
            method: 'post',
            url: requestUrl
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

        const requestParams = this.generate_string_params(this.accessTokenUrl());
        const queryUrl = `${this.accessTokenUrl()}?`+
            `oauth_consumer_key=${requestParams.oauth_consumer_key}` +
            `&oauth_nonce=${requestParams.oauth_nonce}` +
            `&oauth_signature=${requestParams.oauth_signature}` +
            `&oauth_signature_method=HMAC-SHA1` +
            `&oauth_timestamp=${requestParams.oauth_timestamp}` +
            `&oauth_token=${query['?oauth_token']}` +
            `&oauth_verifier=${query.oauth_verifier}` +
            `&oauth_version=1.0`;

        console.log(queryUrl, 'acess url');debugger;
        axios({
            method: 'POST',
            url: queryUrl,
        })
            .then(response => {
                console.log(response)
                if( response.statusText ==='OK') {
                   return response;
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
}