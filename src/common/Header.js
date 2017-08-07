import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const NavMenu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >

        <MenuItem primaryText={<Link to="/events">Ивенты по близости</Link>} />
        <MenuItem primaryText={<Link to="/search-events">Поиск Ивентов</Link>}/>
        <MenuItem primaryText={<Link to="/add-event">Создать Ивент</Link>}/>
    </IconMenu>
);

NavMenu.muiName = 'IconMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppHeader extends Component {

    render() {
        return (
            <div>
                <AppBar
                    title="Event-In! - Поиск мероприятий"
                    iconElementLeft={<span className="logo"><img src='/assets/logo.png' alt='Sample alt'/></span>}
                    iconElementRight={<NavMenu/>}
                />
            </div>
        );
    }
}

export default AppHeader;