import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import { Link } from 'react-router-dom';
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
            nonce:'1cdb7f498ba9811513f2'
        }
        console.log(requestToken);
        const requestTokenUrl = `${requestToken.resource}?oauth_callback=${requestToken.callbackUrl}&oauth_consumer_key=${requestToken.consumerKey}&oauth_nonce=${requestToken.nonce}&oauth_signature=8EfteAvDBuE8MTVBABg2WhXnzY0%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${requestToken.timeStamp}&oauth_version=1.0`;
console.log(requestTokenUrl);
        const myInit = { method: requestToken.method,
                        mode: 'cors',
                        cache: 'default' };
        fetch(requestTokenUrl, myInit)
            .then(res => res.json())
            .then(res => {
                console.log(res)

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
            </div>
            )
    }
}
export default Homepage;