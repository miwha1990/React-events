import React,{ Component } from 'react';
import {Card} from 'material-ui/Card';
import { Link } from 'react-router-dom';
class Homepage extends Component {
    render() {
        return (
            <div className="main-btns-list">
                <Link to="/events">
                    <Card className="main-btns">
                        <h3>Ближайшие Ивенты</h3>
                    </Card>
                </Link>
                <Link  to="/search-events">
                    <Card className="main-btns">
                        <h3>Поиск Ивентов</h3>
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