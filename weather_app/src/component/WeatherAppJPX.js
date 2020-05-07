import React from "react";
import './weather.css';

const WeatherAppJPX = (props) => {

    return (

        <div className='main'>
            <div className='card'>
                <div className='card_top'>
                    <div className='card_top_item'>
                        <i className={`wi ${props.icon} icon`}></i>
                        <h3>{props.description}</h3>
                        {props.city},{props.country}

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
                        <input type='text' className='input' name='city' autoComplete='off' placeholder='city'/>
                        <br />
                        <input type='text' className='input' name='country' autoComplete='off' placeholder='country'/>
                        <br />
                        <button className='button'> Check Weather</button>
                        </form>
                    </div>
                </div>
                <div className='card_bottom'>
                    <div className='card_bottom_item'>

                    </div>
                    <div className='card_bottom_item'>

                    </div>
                    <div className='card_bottom_item'>

                    </div>
                    <div className='card_bottom_item'>

                    </div>
                    <div className='card_bottom_item'>

                    </div>
                    
                </div>
            </div>
        </div>
    );

}



export default WeatherAppJPX;