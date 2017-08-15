import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import renderHTML from 'react-render-html';
// import oauthService from '../common/oauthService';

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};
class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorised:false,
            dialog: '',
            open:false
        }

    }
    componentWillMount() {
        /*if(!this.state.authorised) {
            oauthService.requestToken();
        }*/
        const requestToken = {
            method: 'POST',
            resource: 'http://eventful.com/oauth/request_token',
            callbackUrl: 'http://localhost:3000/callback',
            timeStamp: Math.round((new Date()).getTime() / 1000.0),
            consumerKey : 'a57e84727c7443a1e56b',
            consumerSecret: '335d0af5c1aba780e4a1',
            oauthSignature: 'OMcCJ4mfvCsL1HQY%2F51mpikGymY%3D',
            nonce:'123456789'
        }

        const oauth = OAuth({
            consumer: {
                key: 'a57e84727c7443a1e56b',
                secret: '335d0af5c1aba780e4a1'
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
        });
        const request_data = {
            url: 'http://eventful.com/oauth/request_token',
            method: 'POST',
            data: {
                oauth_callback: 'http://localhost:3000/callback'
            }
        };

        const request_params = oauth.authorize(request_data);
        const requestTokenUrl = `${requestToken.resource}?oauth_callback=${request_params.oauth_callback}&oauth_consumer_key=${request_params.oauth_consumer_key}&oauth_nonce=${request_params.oauth_nonce}&oauth_signature=${request_params.oauth_signature}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${request_params.oauth_timestamp}&oauth_version=1.0`;

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
        const myHeaders = new Headers();
              myHeaders.set('Authorization', 'OAuth oauth_consumer_key="a57e84727c7443a1e56b",oauth_timestamp="'+Math.round((new Date()).getTime() / 1000.0)+'",oauth_signature_method="HMAC-SHA1",oauth_nonce="qwerty",oauth_version="1.0",oauth_signature="'+request_params.oauth_signature+'"')
              myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

        axios({
                method: 'post',
                url: requestTokenUrl,
                headers: myHeaders
            })
            .then(response => {
                if( response.statusText ==='OK') {
                    let url = 'http://eventful.com/oauth/authorize?oauth_token='+getQueryVariable('oauth_token', response.data);
                    console.log(url);
                    window.location.href = url;
                }

                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });

    }
    render() {
        return (
            <div className="main-btns-list">
                <Link to="/events">
                    <Card className="main-btns">
                        <h3>Ближайшие Ивенты</h3>
                    </Card>
                </Link>
                <Link to="/venues">
                    <Card className="main-btns">
                        <h3>Культурные центры</h3>
                    </Card>
                </Link>
                <Link  to="/add-venue">
                    <Card className="main-btns">
                        <h3>Добавить Место</h3>
                    </Card>
                </Link>
                <Link to="/add-event">
                    <Card className="main-btns">
                        <h3>Создать Ивент</h3>
                    </Card>
                </Link>
                <Dialog
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    open={this.state.open}
                >
                    {renderHTML(this.state.dialog)}
                </Dialog>
            </div>
            )
    }
}
export default Homepage;