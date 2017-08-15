import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import oauthService from '../common/oauthService';

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authorised:false,
            dialog: '',
            open:false
        }
        console.log(this.props.location.search)

    }
    componentWillMount() {
        if(!this.state.authorised) {
            oauthService.requestToken();
        }

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