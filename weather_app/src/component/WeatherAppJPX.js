import React from "react";
import './weather.css';
//import imgurl from './background.jpg';
import clearImgUrl from './clear.jpg';
import cloudsImgUrl from './clouds.jpg';
import drizzleImgUrl from './drizzle.jpg';
import rainImgUrl from './rain.jpg';
import snowImgUrl from './snow.jpeg';
import thunderstormImgUrl from './thunderstorm.jpeg';
import atmosphereImgUrl from './atmosphere.jpg';





const WeatherAppJPX = (props) => {

    let url = '', location = '', background = {};


    switch (props.icon) {
        case 'wu-tstorms':
            url = 'url(' + thunderstormImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-chancerain':
            url = 'url(' + drizzleImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-rain':
            url = 'url(' + rainImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-snow':
            url = 'url(' + snowImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-fog':
            url = 'url(' + atmosphereImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-sunny':
            url = 'url(' + clearImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
        case 'wu-cloudy':
            url = 'url(' + cloudsImgUrl + ')' + `no-repeat center /100% 100%`;
            break;
    }

    background = {
        background: url,
    };

    location = `${props.city} ${props.country}`;

    const buttonAnimation=()=>{
        const btn= document.getElementById('btn_search');
        btn.innerHTML='Searching';
        setTimeout(()=>{
            btn.innerHTML='Search';
        },500);

    }



    return (

        <div className='main' style={background}>
            <div className='card'  >
                <div className='card_top' >
                    <div className='card_top_item'>
                        {/* <i className={`wi ${props.icon} icon`}></i> */}
                        <i className={`wu wu-white wu-128 ${props.icon}`}></i>
                        <div className='card_top_item_description'>{props.description}</div>
                        <div className='card_top_item_location' >{props.city}&emsp;&emsp;{props.country}</div>

                    </div>
                    <div className='card_top_item'>

                        {props.temp ? <div className='card_top_item_temp'>{props.temp}&deg;</div> : null}

                        {(props.temp_max && props.temp_min) ? <div className='card_top_item_tempMaxMin'><span>{props.temp_max}&deg;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span> {props.temp_min}&deg;</span></div> : null}
                        {props.humidity ? <div className='card_top_item_HWV'>Humidity:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{props.humidity}&emsp;%</div> : null}
                        {props.visibility ? <div className='card_top_item_HWV'>Visibility:&emsp;&emsp;&emsp;&emsp;&emsp;{props.visibility}&emsp;km</div> : null}
                        {props.wind_speed ? <div className='card_top_item_HWV'>Wind:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{props.wind_speed}&emsp;km/h</div> : null}
                    </div>
                    <div className='card_top_item'>
                        <form onSubmit={props.loadWeather}>
                            <div className='inputComponent'>
                                <input type='text' className='input' name='city' autoComplete='off' />
                                <label className='labelCity'>
                                    <span className='contentCity'>City</span>
                                </label>
                            </div>
                            <br />
                            
                            <div><button className='buttonSearch' id='btn_search' onClick={buttonAnimation}>Search</button></div>
                        </form>
                    </div>
                </div>
                <div className='card_bottom'>
                    <div className='card_bottom_item'>
                        <br />
                        <div className='card_bottom_item_date'> {props.dateF[0]}</div>
                        <div className='card_bottom_item_icon'><i className={`wu wu-white wu-64 ${props.iconF[0]}`}></i></div>
                        {props.tempF[0] ? (<div className='card_bottom_item_temperture'> {props.tempF[0]}&deg;</div>) : null}
                        <div className='card_bottom_item_description'> {props.descriptionF[0]}</div>
                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <div className='card_bottom_item_date'> {props.dateF[1]}</div>
                        <div className='card_bottom_item_icon'><i className={`wu wu-white wu-64 ${props.iconF[1]}`}></i></div>
                        {props.tempF[1] ? (<div className='card_bottom_item_temperture'> {props.tempF[1]}&deg;</div>) : null}
                        <div className='card_bottom_item_description'> {props.descriptionF[1]}</div>
                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <div className='card_bottom_item_date'> {props.dateF[2]}</div>
                        <div className='card_bottom_item_icon'><i className={`wu wu-white wu-64 ${props.iconF[2]}`}></i></div>
                        {props.tempF[2] ? (<div className='card_bottom_item_temperture'> {props.tempF[2]}&deg;</div>) : null}
                        <div className='card_bottom_item_description'> {props.descriptionF[2]}</div>
                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <div className='card_bottom_item_date'> {props.dateF[3]}</div>
                        <div className='card_bottom_item_icon'><i className={`wu wu-white wu-64 ${props.iconF[3]}`}></i></div>
                        {props.tempF[3] ? (<div className='card_bottom_item_temperture'> {props.tempF[3]}&deg;</div>) : null}
                        <div className='card_bottom_item_description'> {props.descriptionF[3]}</div>
                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <div className='card_bottom_item_date'> {props.dateF[4]}</div>
                        <div className='card_bottom_item_icon'><i className={`wu wu-white wu-64 ${props.iconF[4]}`}></i></div>
                        {props.tempF[4] ? (<div className='card_bottom_item_temperture'> {props.tempF[4]}&deg;</div>) : null}
                        <div className='card_bottom_item_description'> {props.descriptionF[4]}</div>
                    </div>

                </div>
            </div>
        </div>
    );

}



export default WeatherAppJPX;