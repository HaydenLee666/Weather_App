import React from "react";
import './weather.css';
//import imgurl from './background.jpg';
import clearImgUrl from './clear.jpg';
import cloudsImgUrl from './clouds.jpeg';
import drizzleImgUrl from './drizzle.jpeg';
import rainImgUrl from './rain.jpeg';
import snowImgUrl from './snow.jpeg';
import thunderstormImgUrl from './thunderstorm.jpeg';
import atmosphereImgUrl from './atmosphere.jpeg';



const WeatherAppJPX = (props) => {
        
    const url='url(' +clearImgUrl+ ')';
    const a='background-size';
    const c={
        background:url,
        a: 'contain',
        };
    return (

        <div className='main' >
            <div className='card'  >
                <div className='card_top' >
                    <div className='card_top_item'>
                        <i className={`wi ${props.icon} icon`}></i>
                        <h3>{props.description}</h3>
                        {props.city}{props.country}

                    </div>
                    <div className='card_top_item'>
                        {props.isLoading && <h1>Loading...</h1>}
                        {!props.isLoading && (<span>{props.temp}</span>)}
                        {!props.isLoading && (<span>&deg;</span>)}
                        <br />
                        <span> {props.temp_max}&deg;</span>
                        <span> {props.temp_min}&deg;</span>
                    </div>
                    <div className='card_top_item'>
                        <form onSubmit={props.loadWeather}>
                            <input type='text' className='input' name='city' autoComplete='off' placeholder='city' />
                            <br />

                            <br />
                            <button className='button'> Check Weather</button>
                        </form>
                    </div>
                </div>
                <div className='card_bottom'>
                    <div className='card_bottom_item'>
                        <br />
                        <span> {props.dateF[0]}</span>
                        <br />
                        <i className={`wi ${props.iconF[0]} `}></i>
                        <br />
                        <span> {props.tempF[0]}&deg;</span>
                        <br />
                        <span> {props.descriptionF[0]}</span>

                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <span> {props.dateF[1]}</span>
                        <br />
                        <i className={`wi ${props.iconF[1]} `}></i>
                        <br />
                        <span> {props.tempF[1]}&deg;</span>
                        <br />
                        <span> {props.descriptionF[1]}</span>

                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <span> {props.dateF[2]}</span>
                        <br />
                        <i className={`wi ${props.iconF[2]} `}></i>
                        <br />
                        <span> {props.tempF[2]}&deg;</span>
                        <br />
                        <span> {props.descriptionF[2]}</span>

                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <span> {props.dateF[3]}</span>
                        <br />
                        <i className={`wi ${props.iconF[3]} `}></i>
                        <br />
                        <span> {props.tempF[3]}&deg;</span>
                        <br />
                        <span> {props.descriptionF[3]}</span>
                    </div>
                    <div className='card_bottom_item'>
                        <br />
                        <span> {props.dateF[4]}</span>
                        <br />
                        <i className={`wi ${props.iconF[4]} `}></i>
                        <br />
                        <span> {props.tempF[4]}&deg;</span>
                        <br />
                        <span> {props.descriptionF[4]}</span>
                    </div>

                </div>
            </div>
        </div>
    );

}



export default WeatherAppJPX;