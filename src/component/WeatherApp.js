import React from "react";
import Weather from './Weather.js';
import './WeatherApp.scss';


const API_key = process.env.REACT_APP_WEATHER_API_KEY;

class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            temp: undefined,
            tempMax: undefined,
            tempMin: undefined,
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            description: "",
            humidity:undefined,
            windSpeed:undefined,
            visibility:undefined,
            
            tempF: [],
            iconF: [],
            dateF: [],
            descriptionF: [],
        };

        // store icons' ccs name
        this.weatherIcons = {
            Thunderstorm: "wu-tstorms",
            Drizzle: "wu-chancerain",
            Rain: "wu-rain",
            Snow: "wu-snow",
            Atmosphere: "wu-fog",
            Clear: "wu-sunny",
            Clouds: "wu-cloudy"
        };
    }

    //change icon'id into icons' ccs name
    get_WeatherIcon(weatherIcons, rangeId) {
        let weatherIcon;
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                weatherIcon = weatherIcons.Thunderstorm;

                break;
            case rangeId >= 300 && rangeId <= 321:
                weatherIcon = weatherIcons.Drizzle;

                break;
            case rangeId >= 500 && rangeId <= 521:
                weatherIcon = weatherIcons.Rain;

                break;
            case rangeId >= 600 && rangeId <= 622:
                weatherIcon = weatherIcons.Snow;

                break;
            case rangeId >= 701 && rangeId <= 781:
                weatherIcon = weatherIcons.Atmosphere;

                break;
            case rangeId === 800:
                weatherIcon = weatherIcons.Clear;

                break;
            case rangeId >= 801 && rangeId <= 804:
                weatherIcon = weatherIcons.Clouds;
                break;
            default:

        }
        return weatherIcon;
    }

    //change original data into date
    get_Date(str) {
        let dateStr, monthStr, dayStr;
        switch (str.substr(0, 2)) {
            case '01':
                monthStr = 'Jan';
                break;
            case '02':
                monthStr = 'Feb';
                break;
            case '03':
                monthStr = 'Mar';
                break;
            case '04':
                monthStr = 'Apr';
                break;
            case '05':
                monthStr = 'May';
                break;
            case '06':
                monthStr = 'Jun';
                break;
            case '07':
                monthStr = 'Jul';
                break;
            case '08':
                monthStr = 'Aug';
                break;
            case '09':
                monthStr = 'Sep';
                break;
            case '10':
                monthStr = 'Oct';
                break;
            case '11':
                monthStr = 'Nov';
                break;
            case '12':
                monthStr = 'Dec';
                break;
            default:
        }

        if (str[3] === '1') {
            dayStr = str.substr(3);
        } else {
            dayStr = str.substr(4);
        }

        dateStr = `${monthStr}  ${dayStr}`;

        return dateStr;
    }

    async componentDidMount() {
        //get sydney weather as default
        this.fetchWeather('Sydney');
    }

     loadWeather = async e => {
        e.preventDefault();
        const newcity = e.target.elements.city.value;
        this.fetchWeather(newcity);
    }
    fetchWeather=async(city)=>{

        const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
        const apiF = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;
        //get current weather
        const response = await (await fetch(api)).json();
            if (response.cod === '404') {
                alert("Please input correct city name!");
            } else {
                this.setState({
                    isLoading: false,
                    city: response.name,
                    country: response.sys.country,
                    temp: this.calculateCelsius(response.main.temp),
                    tempMax: this.calculateCelsius(response.main.temp_max),
                    tempMin: this.calculateCelsius(response.main.temp_min),
                    description: this.optimizedDescription(response.weather[0].description),
                    icon: this.get_WeatherIcon(this.weatherIcons, response.weather[0].id),
                    humidity:response.main.humidity,
                    visibility:Math.round(response.visibility/1000),
                    windSpeed:Math.round(response.wind.speed*3.6),
                });
                //function: forecast coming five days
                const responseF = await (await fetch(apiF)).json();
                const obj = {};
                const tempFArray = [], iconFArray = [], dateFArray = [], descriptionFArray = [];
                obj[0] = responseF.list[7];
                obj[1] = responseF.list[15];
                obj[2] = responseF.list[23];
                obj[3] = responseF.list[31];
                obj[4] = responseF.list[39];
                for (let i = 0; i <= 4; i++) {
                    tempFArray.push(this.calculateCelsius(obj[i].main.temp));
                    descriptionFArray.push(this.optimizedDescription(obj[i].weather[0].description));
                    iconFArray.push(this.get_WeatherIcon(this.weatherIcons, obj[i].weather[0].id));
                    dateFArray.push(this.get_Date(obj[i].dt_txt.slice(5, 10)));
                }
                this.setState({
                    tempF: tempFArray,
                    descriptionF: descriptionFArray,
                    iconF: iconFArray,
                    dateF: dateFArray,
                });
            }
    }

    calculateCelsius(temp) {
        return Math.floor(temp - 273.15);
    }

    optimizedDescription(description){
        description=description[0].toUpperCase()+description.slice(1);

        for(let i=0;i<=description.length;i++){
            if(description[i]===" "){
                description=description.slice(0,i+1)+description[i+1].toUpperCase()+description.slice(i+2);
            }
        }
            return (description);

    }



    render() {

        return (
            <section className='main' id='main'>
            <Weather
                loadWeather={this.loadWeather}
                city={this.state.city}
                country={this.state.country}
                icon={this.state.icon}
                temp={this.state.temp}
                tempMax={this.state.tempMax}
                tempMin={this.state.tempMin}
                description={this.state.description}
                tempF={this.state.tempF}
                descriptionF={this.state.descriptionF}
                iconF={this.state.iconF}
                dateF={this.state.dateF} 
                humidity={this.state.humidity}
                visibility={this.state.visibility}
                windSpeed={this.state.windSpeed}               
            />
            </section>



        );
    }
}

export default WeatherApp;