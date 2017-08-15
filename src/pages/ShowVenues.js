import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Getlocation from '../common/GetGeoLocation';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import CircularProgress from 'material-ui/CircularProgress';
import renderHTML from 'react-render-html';
// import axios from 'axios';

const style = {
    position: 'fixed',
    bottom: 10,
    marginLeft: -25,
    zIndex: 9999
};

class ShowEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            app_key: 'fttM848t8nfNDVN6',
            venues: null,
            total_items: null,
            current_page: null,
            total_pages: null,
            items_per_page: null,
            current_lat:0,
            current_lon:0,
            location:null,
            noEvents: false
        };
    }

    componentDidMount() {

        Getlocation.getLocation((current_lat,current_lon)=>{
            this.setState({current_lat,current_lon});
            const prettyLocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.current_lat},${this.state.current_lon}&result_type=locality&language=en&key=AIzaSyDNyL3Vz7TjVkCqqJh0m2ShHn8B6iJIJwI`;

            const myHeaders = new Headers();

            const myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

            fetch(prettyLocationUrl, myInit)
                .then(res => res.json())
                .then(res => {
                    this.setState({location:res.results[0].address_components[0].long_name})
                    const venuesUrl = `http://api.eventful.com/json/venues/search?app_key=${this.state.app_key}&location=${this.state.location}`;
                    fetch(venuesUrl, myInit)
                        .then(res => res.json())
                        .then(res => {
                             this.setState({
                                venues:res.venues.venue,
                                total_items: res.total_items,
                                current_page: res.page_number,
                                items_per_page: res.page_size
                            });
                        });
                });


        })

    }

    getDistanceFromLatLonInKm(lat1,lat2,lon1,lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        const dLon =this.deg2rad(lon2-lon1);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(3);// Distance in km
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    render() {
        let mainOutput = null;
        if(this.state.venues){
            mainOutput =
                <div>
                    <TextField
                        hintText="Начните писать..."
                        floatingLabelText="Поиск Культурных центров"
                    /><br/>
                    <List>
                        {this.state.venues.map(venue =>

                            <ListItem
                                key={venue.id}
                                leftAvatar={<Avatar src={(venue.image && venue.image[0])? venue.image.medium.url:'https://dummyimage.com/128.png/09f/fff'} />}
                                primaryText={venue.name}
                                secondaryText={this.getDistanceFromLatLonInKm(venue.latitude,this.state.current_lat,venue.longitude,this.state.current_lon)+' км'}
                                rightIcon={<ActionInfo />}
                            />

                        )}
                    </List>
                </div>

        } else if(this.state.noEvents){
            mainOutput = renderHTML('<h1>Извините, нет культурных центров тут...</h1>')
        } else {
            mainOutput = <CircularProgress size={80} thickness={7} color="#E91E63"/>
        }
        return (
            <div>

                <div className="main_content">
                    {mainOutput}
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