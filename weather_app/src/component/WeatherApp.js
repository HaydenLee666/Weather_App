import React from "react";
import './weather.css';
import WeatherAppJPX from './WeatherAppJPX.js';



const API_key = '7abb2f96af69ff0a9164e92bc934932d';
const city = 'Sydney';
const apiF= `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;
const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;

class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            temp: undefined,
            temp_max: undefined,
            temp_min: undefined,
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            description: "",
            error:false,

            tempF:[],


        };

        this.weatherIcons = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };
    }

    get_WeatherIcon(weatherIcons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                this.setState({ icon: weatherIcons.Thunderstorm });
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: weatherIcons.Drizzle });
                break;
            case rangeId >= 500 && rangeId <= 521:
                this.setState({ icon: weatherIcons.Rain });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({ icon: weatherIcons.Snow });
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({ icon: weatherIcons.Atmosphere });
                break;
            case rangeId === 800:
                this.setState({ icon: weatherIcons.Clear });
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({ icon: weatherIcons.Clouds });
                break;
            default:
                this.setState({ icon: weatherIcons.Clear });
        }
    }

    async componentDidMount() {
        const response = await (await fetch(api)).json();
        // const response=await fetch(api);
        const responseF = await (await fetch(apiF)).json();

        console.log(response);
        console.log(responseF);
        
        const obj={};
        
        obj[0]=responseF.list[7];
        obj[1]=responseF.list[15];
        obj[2]=responseF.list[23];
        obj[3]=responseF.list[31];
        obj[4]=responseF.list[39];
        console.log(obj);

        // for(let i=0;i<=4;i++){
        //     tempF.push()
        // }

        


        // const {city:{name},city:{sunrise}}=response;
        // //const sunrise=response.city.sunrise;


        this.setState({
            isLoading: false,
            city: response.name,
            country: response.sys.country,
            temp: this.calculateCelsius(response.main.temp),
            temp_max: this.calculateCelsius(response.main.temp_max),
            temp_min: this.calculateCelsius(response.main.temp_min),
            description: response.weather[0].description,
        });

        this.get_WeatherIcon(this.weatherIcons, response.weather[0].id);


        // for(let i=7,j=0;i<=40;i=i+8){
        //     this.setState({
        //         tempF[j]:responseF.list[0].main.temp,           
        //      });

        // }

    }

    loadWeather = async e => {
        e.preventDefault();
        
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const newapi = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`;

        const response = await (await fetch(newapi)).json();
        console.log(response);

        if(city&&country){
        this.setState({
            isLoading: false,
            city: response.name,
            country: response.sys.country,
            temp: this.calculateCelsius(response.main.temp),
            temp_max: this.calculateCelsius(response.main.temp_max),
            temp_min: this.calculateCelsius(response.main.temp_min),
            description: response.weather[0].description,
        });
        this.get_WeatherIcon(this.weatherIcons, response.weather[0].id);
    }else{
        this.setState({error:true});
        alert("Hello! I am an alert box!!");
    }

    }

    calculateCelsius(temp) {
        return Math.floor(temp - 273.15);
    }



    render() {

        //const {isLoading, temp}=this.state;

        return (

            <WeatherAppJPX
                loadWeather={this.loadWeather}
                city={this.state.city}
                country={this.state.country}
                icon={this.state.icon}
                temp={this.state.temp}
                temp_max={this.state.temp_max}
                temp_min={this.state.temp_min}
                description={this.state.description}
            />




        );
    }
}

export default WeatherApp;