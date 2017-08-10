import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import {withRouter} from "react-router-dom";

class AddVenue extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            category: null,
            index:'',
            name:'',
            description:'',
            place:'',
            message: '',
            open: false,
            disabledButton:false

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChange = (place) => this.setState({ place })
    }
    handleChange = (event, index, category) => this.setState({category});
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleFormSubmit = (event) => {
        event.preventDefault()
        const data = {};
        this.setState({disabledButton:true});
        /*geocodeByAddress(this.state.place)
            .then(results => {console.log(results[0]); return getLatLng(results[0])})
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))*/
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
            });
    }
    serialize = function(obj) {
        const str = [];
        for(let p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(p + "=" + obj[p]);
            }
        return str.join("&");
    }

    render() {
        const inputProps = {
            value: this.state.place,
            onChange: this.onChange,
            placeholder: 'Город / местность',
            type: 'search',
        }
        const cssClasses = {
            root: 'googleAutocomplete',
            input: 'form-control',
            autocompleteContainer: 'my-autocomplete-container'
        }
        let loader = false;
        if(this.state.disabledButton) loader = <CircularProgress />;
        return (

            <Card>
                <CardTitle title="Добавить культурный центр"/>
                <CardText>
                    <form onSubmit={this.handleFormSubmit}>
                        <TextField
                            required
                            name="name"
                            value={this.state.name}
                            hintText="Начтине писать..."
                            onChange={this.handleInputChange}
                            floatingLabelText="Название места"
                        /><br />
                        <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} required/>
                        <br />
                        <TextField
                            onChange={this.handleInputChange}
                            name="index"
                            value={this.state.index}
                            hintText="Начтине писать..."
                            floatingLabelText="Индекс"
                        /><br />
                        <TextField
                            required
                            name="address"
                            value={this.state.address}
                            hintText="Начтине писать..."
                            onChange={this.handleInputChange}
                            floatingLabelText="Адресс"
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
                            floatingLabelText="Категория"
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={null} primaryText=""/>
                            <MenuItem value="Airport" primaryText="Аэропорт"/>
                            <MenuItem value="Arena" primaryText="Арена"/>
                            <MenuItem value="Art+Gallery" primaryText="Галерея"/>
                            <MenuItem value="Athletic+Field" primaryText="Стадион"/>
                            <MenuItem value="Auditorium" primaryText="Аудитория"/>
                            <MenuItem value="Bar" primaryText="Бар"/>
                            <MenuItem value="Night+Club" primaryText="Ночной клуб"/>
                            <MenuItem value="Beach" primaryText="Пляж"/>
                            <MenuItem value="Bookstore" primaryText="Книжный магазин"/>
                            <MenuItem value="Bridge" primaryText="Мост"/>
                            <MenuItem value="Camp" primaryText="Лагерь"/>
                            <MenuItem value="Cinema" primaryText="Кинотеатр"/>
                            <MenuItem value="Coffee+House" primaryText="Кофейная"/>
                            <MenuItem value="Concert+Hall" primaryText="Концертный зал"/>
                            <MenuItem value="Convention+Center" primaryText="Центр обсуждений"/>
                            <MenuItem value="Court+House" primaryText="Суд"/>
                            <MenuItem value="Factory" primaryText="Завод"/>
                            <MenuItem value="Government+Building" primaryText="Административное здание"/>
                            <MenuItem value="Gymnasium" primaryText="Гимназия"/>
                            <MenuItem value="Hotel" primaryText="Отель"/>
                            <MenuItem value="Library" primaryText="Библиотека"/>
                            <MenuItem value="Market" primaryText="Магазинг"/>
                            <MenuItem value="Meeting+Hall" primaryText="Конференс-зал"/>
                            <MenuItem value="Co-working" primaryText="Коворкинг"/>
                            <MenuItem value="Military+Base" primaryText="Военная база"/>
                            <MenuItem value="Museum" primaryText="Музей"/>
                            <MenuItem value="Office+Building" primaryText="Офисное здание"/>
                            <MenuItem value="Street" primaryText="Улица"/>
                            <MenuItem value="Park" primaryText="Парк"/>
                            <MenuItem value="Square" primaryText="Площадь"/>
                            <MenuItem value="Restaurant"  primaryText="Ресторан"/>
                            <MenuItem value="School" primaryText="Школа"/>
                            <MenuItem value="Mall" primaryText="Мол"/>
                            <MenuItem value="Stadium"  primaryText="Стадон"/>
                            <MenuItem value="Theatre" primaryText="Театр"/>
                            <MenuItem value="University" primaryText="Университет"/>
                        </SelectField>
                        <br />
                        <RaisedButton label="Подтвердить" secondary={true} disabled={this.state.disabledButton} type="submit"/>{loader}
                    </form>
                </CardText>
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