import React from "react";
import './weather.css';
import WeatherAppJPX from './WeatherAppJPX.js';



const API_key = '7abb2f96af69ff0a9164e92bc934932d';
const CITY = 'Sydney';
const API_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_key}`;
const API = `http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_key}`;

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
            error: false,
            humidity:undefined,
            wind_speed:undefined,
            visibility:undefined,
            
            tempF: [],
            iconF: [],
            dateF: [],
            descriptionF: [],

          

        };

        // store icons' ccs name
        this.weatherIcons = {
            // Thunderstorm: "wi-thunderstorm",
            // Drizzle: "wi-sleet",
            // Rain: "wi-storm-showers",
            // Snow: "wi-snow",
            // Atmosphere: "wi-fog",
            // Clear: "wi-day-sunny",
            // Clouds: "wi-day-fog",
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
        }

        if (str[3] == '1') {
            dayStr = str.substr(3);
        } else {
            dayStr = str.substr(4);
        }

        dateStr = `${monthStr}  ${dayStr}`;

        return dateStr;
    }

    async componentDidMount() {

        // function: get today weather
        const response = await (await fetch(API)).json();
        // const response=await fetch(api);

        console.log("Today:");
        console.log(response);

        // const {city:{name},city:{sunrise}}=response;
        // //const sunrise=response.city.sunrise;


        this.setState({
            isLoading: false,
            city: response.name,
            country: response.sys.country,
            temp: this.calculateCelsius(response.main.temp),
            temp_max: this.calculateCelsius(response.main.temp_max),
            temp_min: this.calculateCelsius(response.main.temp_min),
            description: this.optimizedDescription(response.weather[0].description),
            icon: this.get_WeatherIcon(this.weatherIcons, response.weather[0].id),
            humidity:response.main.humidity,
            visibility:Math.round(response.visibility/1000),
            wind_speed:Math.round(response.wind.speed*3.6),
        });

        

        //function: forecast coming five days
        const responseF = await (await fetch(API_FORECAST)).json();
        console.log('Forecast:');
        console.log(responseF);
        const obj = {};
        const tempFArray = [], iconFArray = [], dateFArray = [], descriptionFArray = [];
        obj[0] = responseF.list[7];
        obj[1] = responseF.list[15];
        obj[2] = responseF.list[23];
        obj[3] = responseF.list[31];
        obj[4] = responseF.list[39];
        console.log('Filled forecast:');
        console.log(obj);

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

    loadWeather = async e => {
        e.preventDefault();

        const newcity = e.target.elements.city.value;
        const newapi = `http://api.openweathermap.org/data/2.5/weather?q=${newcity}&appid=${API_key}`;
        const newapiF = `http://api.openweathermap.org/data/2.5/forecast?q=${newcity}&appid=${API_key}`;




        if (newcity) {


            const response = await (await fetch(newapi)).json();
            console.log("Today:");
            console.log(response);

            if (response.cod == 404) {
                alert("Please input correct city name!");
            } else {
                this.setState({
                    isLoading: false,
                    city: response.name,
                    country: response.sys.country,
                    temp: this.calculateCelsius(response.main.temp),
                    temp_max: this.calculateCelsius(response.main.temp_max),
                    temp_min: this.calculateCelsius(response.main.temp_min),
                    description: this.optimizedDescription(response.weather[0].description),
                    icon: this.get_WeatherIcon(this.weatherIcons, response.weather[0].id),
                    humidity:response.main.humidity,
                    visibility:Math.round(response.visibility/1000),
                    wind_speed:Math.round(response.wind.speed*3.6),
                });


                //function: forecast coming five days
                const responseF = await (await fetch(newapiF)).json();
                console.log('Forecast:');
                console.log(responseF);
                const obj = {};
                const tempFArray = [], iconFArray = [], dateFArray = [], descriptionFArray = [];
                obj[0] = responseF.list[7];
                obj[1] = responseF.list[15];
                obj[2] = responseF.list[23];
                obj[3] = responseF.list[31];
                obj[4] = responseF.list[39];
                console.log('Filled forecast:');
                console.log(obj);

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

        } else {
            this.setState({ error: true });
            alert("Please input city name!");
        }

    }

    calculateCelsius(temp) {
        return Math.floor(temp - 273.15);
    }

    optimizedDescription(description){
        description=description[0].toUpperCase()+description.slice(1);

        for(let i=0;i<=description.length;i++){
            if(description[i]==" "){
                description=description.slice(0,i+1)+description[i+1].toUpperCase()+description.slice(i+2);
            }
        }
            return (description);

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
                tempF={this.state.tempF}
                descriptionF={this.state.descriptionF}
                iconF={this.state.iconF}
                dateF={this.state.dateF} 
                humidity={this.state.humidity}
                visibility={this.state.visibility}
                wind_speed={this.state.wind_speed}               
            />




        );
    }
}

export default WeatherApp;