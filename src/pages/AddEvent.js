import React from 'react';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import Getlocation from '../common/GetGeoLocation';
// import getTz from 'get-tz';

const style = {
    position: 'fixed',
    bottom: 10,
    marginLeft: -25,
    right:30
};

class AddVenue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            venues:null,
            app_key: '3pdkMsPJgb2K8p3b',
            tags:'',
            allDay:false,
            free:true,
            price:null,
            description:'',
            message:'',
            startTime: null,
            endTime: null,
            open: false,
            disabledButton:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount(){
        Getlocation.getLocation((current_lat,current_lon)=>{
            const prettyLocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${current_lat},${current_lon}&result_type=locality&language=en&key=AIzaSyDNyL3Vz7TjVkCqqJh0m2ShHn8B6iJIJwI`;
            const myInit = { method: 'GET',
                mode: 'cors',
                cache: 'default' };

            fetch(prettyLocationUrl, myInit)
                .then(res => res.json())
                .then(res => {
                    const venuesUrl = `http://api.eventful.com/json/venues/search?app_key=${this.state.app_key}&location=${res.results[0].address_components[0].long_name}`;
                    fetch(venuesUrl, myInit)
                        .then(res => res.json())
                        .then(res => {
                            this.setState({ venues:res.venues.venue });
                        });
                });
        /*getTz().then(rows => {
            console.log(rows);

        })*/
        })
    }
    handleChange = (event, index, category) => this.setState({category})
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleFormSubmit = (event) => {
        /*event.preventDefault()
        const data = {};
        this.setState({disabledButton:true});
        Object.entries(this.state).map(function(e){
            if(e[1]) {
               data[e[0]] = e[1].replace(/[ ]/ig, "+");
            }
            return true;
        });
        const places = this.state.place.split(', ');
        console.log(places);
        if(places[2]) {
            data.city = places[0].replace(/[ ]/ig, "+");
            data.region= places[1].replace(/[ ]/ig, "+");
            data.country = places[2].replace(/[ ]/ig, "+");
        } else {
            data.region= places[0].replace(/[ ]/ig, "+");
            data.country = places[1].replace(/[ ]/ig, "+");
        }
        console.log(this.serialize(data));
        const url = `http://api.eventful.com/json/venues/new?app_key=${this.state.app_key}&${this.serialize(data)}`;
        const myInit = { method: 'GET',
                         mode: 'cors',
                         cache: 'default' };

        fetch(url, myInit)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.message) {
                    this.setState({
                        message: res.message,
                        open:true,
                        disabledButton:false
                    });

                    setTimeout(()=>this.props.history.push("/venues"), 3000)
                }
            });*/
    }
    serialize = function(obj) {
        const str = [];
        for(let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(p + "=" + obj[p]);
            }
        return str.join("&");
    }

    handleChangeStartTime = (event, date) => {
        this.setState({startTime: date});
    };
    handleChangeEndTime = (event, date) => {
        this.setState({endTime: date});
    };

    render() {

        let loader = false;
        let venuesList = null;
        if(this.state.venues){
            venuesList = <div>
                {this.state.venues.map(venue =>
                    <MenuItem value={venue.id} primaryText={venue.name} key={venue.id}/>
                )}
            </div>
        }
        if(this.state.disabledButton) loader = <CircularProgress />;
        return (

            <Card>
                <CardTitle title="Создать мероприятие"  className="form-title"/>
                <CardText className="form-text">
                    <form onSubmit={this.handleFormSubmit}>
                        <TextField
                            required
                            name="name"
                            value={this.state.name}
                            hintText="Начтине писать..."
                            onChange={this.handleInputChange}
                            floatingLabelText="Название мероприятия"
                        /><br />
                        <TimePicker
                            format="24hr"
                            hintText="Время начала"
                            value={this.state.startTime}
                            onChange={this.handleChangeStartTime}
                        />
                        <TimePicker
                            format="24hr"
                            hintText="Время конца"
                            value={this.state.endTime}
                            onChange={this.handleChangeEndTime}
                        />
                        <Checkbox
                            label="Весь день"
                        />
                        <TextField
                            required
                            name="tags"
                            value={this.state.tags}
                            hintText="Начтине писать..."
                            onChange={this.handleInputChange}
                            floatingLabelText="Тэги, разделяются пробелом"
                        /><br />

                        <TextField
                            value={this.state.description}
                            name="description"
                            hintText="Начтине писать..."
                            floatingLabelText="Описание"
                            multiLine={true}
                            onChange={this.handleInputChange}
                            className="addVenueDescription"
                            rows={2}
                        /><br />
                        <SelectField
                            className="addVenueDescription"
                            floatingLabelText="Место проведения"
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            {venuesList}
                        </SelectField>
                        <br />
                        <RaisedButton label="Подтвердить" secondary={true} disabled={this.state.disabledButton} type="submit"/>{loader}
                    </form>
                </CardText>
                <Link to="/">
                    <FloatingActionButton style={style}>
                        <ActionHome/>
                    </FloatingActionButton>
                </Link>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                />
            </Card>

        )
    }
}

export default AddVenue