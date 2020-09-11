import React from "react";
import clearImgUrl from '../backgroundImages/clear.jpg';
import cloudsImgUrl from '../backgroundImages/clouds.jpg';
import drizzleImgUrl from '../backgroundImages/drizzle.jpg';
import rainImgUrl from '../backgroundImages/rain.jpg';
import snowImgUrl from '../backgroundImages/snow.jpeg';
import thunderstormImgUrl from '../backgroundImages/thunderstorm.jpeg';
import atmosphereImgUrl from '../backgroundImages/atmosphere.jpg';





const Weather = (props) => {
    //set background images
    const pageBackground = document.getElementById('main');
    switch (props.icon) {
        case 'wu-tstorms':
            pageBackground.style.background = `url(${thunderstormImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-chancerain':
            pageBackground.style.background = `url(${drizzleImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-rain':
            pageBackground.style.background = `url(${rainImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-snow':
            pageBackground.style.background = `url(${snowImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-fog':
            pageBackground.style.background = `url(${atmosphereImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-sunny':
            pageBackground.style.background = `url(${clearImgUrl}) no-repeat center /100% 100%`;
            break;
        case 'wu-cloudy':
            pageBackground.style.background = `url(${cloudsImgUrl}) no-repeat center /100% 100%`;
            break;
        default:
            
    }

    const buttonAnimation = () => {
        const btn = document.getElementById('btn_search');
        btn.innerHTML = 'Searching';
        setTimeout(() => {
            btn.innerHTML = 'Search';
        }, 500);

    }


    return (      
            <section className='card' >
                <section className='card__top' >
                    <div className='card__top__item'>
                        <i className={`wu wu-white wu-128 ${props.icon}`}></i>
                        <div className='card__top__item__description'><span className='underline'>{props.description}</span></div>
                        <div className='card__top__item__location' >
                            <span>{props.city}</span>
                            <span>{props.country}</span>
                        </div>

                    </div>
                    <div className='card__top__item'>
                        {props.temp ? <div className='card__top__item__temp'>{props.temp}&deg;</div> : null}
                        {(props.tempMax && props.tempMin) ? <div className='card__top__item__tempMaxMin'><span>{props.tempMax}&deg;</span><span> {props.tempMin}&deg;</span></div> : null}
                        {props.humidity ? <div className='card__top__item__HWV'><span>Humidity:</span><span>{props.humidity}&emsp;%</span></div> : null}
                        {props.visibility ? <div className='card__top__item__HWV'><span>Visibility:</span><span>{props.visibility}&emsp;km</span></div> : null}
                        {props.windSpeed ? <div className='card__top__item__HWV'><span>Wind:</span><span>{props.windSpeed}&emsp;km/h</span></div> : null}
                    </div>
                    <div className='card__top__item'>
                        <form onSubmit={props.loadWeather}>
                            <div className='inputComponent'>
                                <input type='text' className='input' name='city' autoComplete='off' required/>
                                <label className='labelCity' htmlFor='city'>
                                    <span className='contentCity'>City</span>
                                </label>
                            </div>
                            <br />
                            <div><button className='buttonSearch' id='btn_search' onClick={buttonAnimation}>Search</button></div>
                        </form>
                    </div>
                </section>
                <div className='card__bottom'>
                    <div className='card__bottom__item'>
                        <br />
                        <div className='card__bottom__item__date'> {props.dateF[0]}</div>
                        <div className='card__bottom__item__icon'><i className={`wu wu-white wu-64 ${props.iconF[0]}`}></i></div>
                        {props.tempF[0] ? (<div className='card__bottom__item__temperture'> {props.tempF[0]}&deg;</div>) : null}
                        <div className='card__bottom__item__description'> {props.descriptionF[0]}</div>
                    </div>
                    <div className='card__bottom__item'>
                        <br />
                        <div className='card__bottom__item__date'> {props.dateF[1]}</div>
                        <div className='card__bottom__item__icon'><i className={`wu wu-white wu-64 ${props.iconF[1]}`}></i></div>
                        {props.tempF[1] ? (<div className='card__bottom__item__temperture'> {props.tempF[1]}&deg;</div>) : null}
                        <div className='card__bottom__item__description'> {props.descriptionF[1]}</div>
                    </div>
                    <div className='card__bottom__item'>
                        <br />
                        <div className='card__bottom__item__date'> {props.dateF[2]}</div>
                        <div className='card__bottom__item__icon'><i className={`wu wu-white wu-64 ${props.iconF[2]}`}></i></div>
                        {props.tempF[2] ? (<div className='card__bottom__item__temperture'> {props.tempF[2]}&deg;</div>) : null}
                        <div className='card__bottom__item__description'> {props.descriptionF[2]}</div>
                    </div>
                    <div className='card__bottom__item'>
                        <br />
                        <div className='card__bottom__item__date'> {props.dateF[3]}</div>
                        <div className='card__bottom__item__icon'><i className={`wu wu-white wu-64 ${props.iconF[3]}`}></i></div>
                        {props.tempF[3] ? (<div className='card__bottom__item__temperture'> {props.tempF[3]}&deg;</div>) : null}
                        <div className='card__bottom__item__description'> {props.descriptionF[3]}</div>
                    </div>
                    <div className='card__bottom__item'>
                        <br />
                        <div className='card__bottom__item__date'> {props.dateF[4]}</div>
                        <div className='card__bottom__item__icon'><i className={`wu wu-white wu-64 ${props.iconF[4]}`}></i></div>
                        {props.tempF[4] ? (<div className='card__bottom__item__temperture'> {props.tempF[4]}&deg;</div>) : null}
                        <div className='card__bottom__item__description'> {props.descriptionF[4]}</div>
                    </div>

                </div>
            </section>    
    );

}



export default Weather;