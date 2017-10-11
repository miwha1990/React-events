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
        const queryUrl = `${this.accessTokenUrl()}?`+
            `oauth_consumer_key=${this.consumer().key}` +
            `&oauth_nonce=${requestParams.oauth_nonce}` +
            `&oauth_signature=${requestParams.oauth_signature}` +
            `&oauth_signature_method=HMAC-SHA1` +
            `&oauth_timestamp=${requestParams.oauth_timestamp}` +
            `&oauth_token=${query['?oauth_token']}` +
            `&oauth_verifier=${query.oauth_verifier}` +
            `&oauth_version=1.0`;

        let myHeaders = new Headers();
        console.log(queryUrl, 'acess url');
        myHeaders.set('Authorization', 'OAuth oauth_consumer_key="'+this.consumer().key+'",oauth_timestamp="'+requestParams.oauth_timestamp+'",oauth_signature_method="HMAC-SHA1",oauth_nonce="'+requestParams.oauth_nonce+'",oauth_version="1.0",oauth_signature="'+requestParams.oauth_signature+'"');
        axios({
            method: 'post',
            url: queryUrl,
            headers: myHeaders
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
//oauth/access_token?oauth_consumer_key=24d4f906d61a88890056&oauth_nonce=2rU3IdRjevAsFp0nLjp6jv6VMNkKTZLq&oauth_signature=twvn3pL2TbL9jzLsed2PESRqA60=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1507713547&oauth_token=18a65357599ccac6832a&oauth_verifier=db792dd0189d486e39e1&oauth_version=1.0
//oauth/access_token?oauth_consumer_key=a57e84727c7443a1e56b&oauth_nonce=02c943977f5c9fd404bd&oauth_signature=EvCDX+0QuSly3uAcCtEsk0sRf30=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1507712411&oauth_token=e0367933af8e260484fb&oauth_verifier=f5dec4065036bf1d38c8&oauth_version=1.0
//oauth/access_token?oauth_consumer_key=bafe29a8e561b3d15803&oauth_nonce=02c943977f5c9fd404bd&oauth_signature=K44I4kgqSQL5k05m4MdNP1dLSv4%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1336765614&oauth_token=a2f0ff589d81971049f5&oauth_verifier=18b1274f229e43152a2b&oauth_version=1.0