import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import oauthSignature from 'oauth-signature';
// import SignatureGenrator from '../oauthSignatureGenerator-master';
class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    componentWillMount() {
        const requestToken = {
            method: 'POST',
            resource: 'http://eventful.com/oauth/request_token',
            callbackUrl: 'http://localhost:3000',
            timeStamp: + new Date(),
            consumerKey : 'a57e84727c7443a1e56b',
            consumerSecret: '335d0af5c1aba780e4a1',
            oauthSignature: 'OMcCJ4mfvCsL1HQY%2F51mpikGymY%3D',
            nonce:'nonce'
        }
       const url = 'http://photos.example.net/photos',
            parameters = {
                oauth_consumer_key : 'a57e84727c7443a1e56b',
                oauth_nonce : 'nonce',
                oauth_timestamp : requestToken.timeStamp,
                oauth_signature_method : 'HMAC-SHA1',
                oauth_version : '1.0'
            },
            consumerSecret = '335d0af5c1aba780e4a1';

        const signature = oauthSignature.generate('POST', requestToken.resource, parameters, consumerSecret);
        // const anotherSignature = SignatureGenrator('POST', requestToken.resource, parameters, consumerSecret);
        console.log(signature,'1');
        // console.log(anotherSignature, '2');
        const requestTokenUrl = `${requestToken.resource}?oauth_callback=${requestToken.callbackUrl}&oauth_consumer_key=${requestToken.consumerKey}&oauth_nonce=${requestToken.nonce}&oauth_signature=${signature}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${requestToken.timeStamp}&oauth_version=1.0`;


        // const myInit = { method: requestToken.method };
        axios.post(requestTokenUrl)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
        /*fetch(requestTokenUrl)
            .then(res => res.json())
            .then(res => {
                console.log(res)

            });*/

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
            </div>
            )
    }
}
export default Homepage;