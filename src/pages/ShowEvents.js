import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Getlocation from '../common/GetGeoLocation';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import axios from 'axios';

const style = {
    position: 'fixed',
    bottom: 10,
    marginLeft: -25
};

class ShowEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            app_key: 'fttM848t8nfNDVN6',
            events: [],
            total_items: null,
            current_page: null,
            total_pages: null,
            items_per_page: null,
            current_lat:0,
            current_lon:0
        };
    }

    componentDidMount() {

        Getlocation.getLocation((current_lat,current_lon)=>{
            this.setState({current_lat,current_lon})
        })


        axios.get(`https://crossorigin.me/http://api.eventful.com/json/events/search?app_key=${this.state.app_key}&location=Kiev&date=Future`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    events:res.data.events.event,
                    total_items: res.data.total_items,
                    current_page: res.data.page_number,
                    items_per_page: res.data.page_size
                });
            });
    }

    calculateDistance(lat1, lat2, lon1, lon2){
        const R = 6371e3; // metres
        const lat1Rad = lat1 * (Math.PI / 180);
        const lat2Rad = lat2 * (Math.PI / 180);
        const deltaLat = lat2-lat1 * (Math.PI / 180);
        const deltaLon = (lon2-lon1) * (Math.PI / 180);

        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }
    render() {
        return (
            <div>

                <div>
                    <List>
                        {this.state.events.map(event =>

                                <ListItem
                                    key={event.id}
                                    leftAvatar={<Avatar src={event.image? event.image.medium.url:'https://dummyimage.com/128.png/09f/fff'} />}
                                    primaryText={event.title}
                                    secondaryText={this.calculateDistance(event.latitude,this.state.current_lat,event.longitude,this.state.current_lon)+' м'}
                                    rightIcon={<ActionInfo />}
                                />




                        )}
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
export default ShowEvents;