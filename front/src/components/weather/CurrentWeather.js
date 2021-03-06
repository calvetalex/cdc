import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../../backend';

const weatherImages = {
    Clear: '/static/img/weather/sun.png',
    Snow: '/static/img/weather/snow.png',
    Clouds: '/static/img/weather/cloud.png',
    Rain: '/static/img/weather/rain.png',
    Drizzle: '/static/img/weather/rain.png',
    Thunderstorm: '/static/img/weather/storm.png',
    Fog: '/static/img/weather/sun_cloud.png',
    Mist: '/static/img/weather/sun_cloud.png',
    Wind: '/static/img/weather/wind.png',
    Humidity: '/static/img/weather/water.png',
};

class CurrentWeather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weather: {},
        };
        let intervalID;
    }

    componentDidMount() {
        this.getWeatherInfo();

        this.intervalID = setInterval(this.getWeatherInfo.bind(this), 300000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getWeatherInfo() {
        const { weatherData } = this.props;

        if (weatherData.city) {
            Backend.weather.getCurrent(weatherData.city).then(weather => this.setState({ weather }));
        }
    }

    getTemperature(tmp) {
        return Math.round(tmp - 273.15);
    }

    getWindDirection(deg) {
        const directions = [
            { dir: 'Nord', min: 0, max: 22.5 },
            { dir: 'Nord-Est', min: 22.5, max: 67.5 },
            { dir: 'Est', min: 67.5, max: 112.5 },
            { dir: 'Sud-Est', min: 112.5, max: 157.5 },
            { dir: 'Sud', min: 157.5, max: 202.5 },
            { dir: 'Sud-Ouest', min: 202.5, max: 247.5 },
            { dir: 'Ouest', min: 247.5, max: 292.5 },
            { dir: 'Nord-Ouest', min: 292.5, max: 337.5 },
            { dir: 'Nord', min: 337.5, max: 360 },
        ];
        return directions.find(dir => dir.min <= deg && dir.max >= deg).dir;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const { weatherData } = this.props;
        const { weather } = this.state;

        if (!weather || Object.keys(weather).length === 0) {
            return (
                <div className="d-flex flex-column justify-content-center">
                    Loading data...
                </div>
            );
        }

        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ margin: '25%', transform: 'translateY(-50%)' }}>
                <h1>{weatherData.city}</h1>
                <img
                    src={`${weatherImages[weather.weather[0].main]}`}
                    alt={weather.weather[0].main}
                    style={{
                        height: '100%',
                        display: 'block',
                        maxWidth: 'fit-content',
                        maxHeight: '100%',
                        alignSelf: 'center',
                    }}
                />
                <p
                    style={{
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '24px',
                            marginBottom: '12px',
                        }}
                    >
                        {this.capitalize(weather.weather[0].description)}
                    </span>
                    <br />
                    <span
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '18px',
                        }}
                    >
                        {`Temp??rature : ${this.getTemperature(weather.main.temp)}??C`}
                    </span>
                    <br />
                    <span
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '13px',
                            marginTop: '-2px',
                        }}
                    >
                        {`Ressenti ${this.getTemperature(weather.main.feels_like)}??C`}
                    </span>
                    <br />
                    <span
                        style={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {`Vent : ${this.getWindDirection(weather.wind.deg)} ?? ${weather.wind.speed} km/h`}
                    </span>
                    <br />
                    <span
                        style={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {`Humidit?? : ${weather.main.humidity}% | Pression : ${weather.main.pressure} hPa`}
                    </span>

                </p>
            </div>
        );
    }
}

CurrentWeather.propTypes = {
    weatherData: PropTypes.object.isRequired,
};

export default CurrentWeather;
