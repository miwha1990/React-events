import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import TextField from 'material-ui/TextField';

const style = {
    position: 'fixed',
    bottom: 10,
    marginLeft: -25
};

class SearchEvents extends Component {
    render() {
        return (
            <div>
                <div>
                    <TextField
                        hintText="Начните писать..."
                        floatingLabelText="Поиск Ивентов"
                    /><br />
                    <List>
                        <ListItem primaryText="Концерт Галкина" rightIcon={<ActionInfo />} />
                        <ListItem primaryText="Футбольный матч" rightIcon={<ActionInfo />} />
                        <ListItem primaryText="Пиво в падике" rightIcon={<ActionInfo />} />
                        <ListItem primaryText="Дома кинотеатр" rightIcon={<ActionInfo />} />
                    </List>
                </div>
                <Link to="/">
                    <FloatingActionButton style={style}>
                        <ActionHome/>
                    </FloatingActionButton>
                </Link>
            </div>
        )
    }
}
export default SearchEvents;