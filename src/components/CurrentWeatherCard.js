import { useState, useEffect } from "react";
import AqiDetails from "./AqiDetail.js";
import HourlyForecast from "./HourlyForecast.js";

import location from "../assets/location.svg";
import hotTemperature from "../assets/temperature_high.svg";
import normalTemperature from "../assets/normal_temperature.svg";
import lowTemperature from "../assets/temperature_low.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";
import windImg from "../assets/windy.svg";
import humidityImg from "../assets/humidity_percentage.svg";

const WeatherDataCard = (props) => {
    const { weatherData, error } = props;
    if(!weatherData) return null;

    const [timeInfo, setTimeInfo] = useState("");

    const updateTimeInfo = () => {
        const date = new Date();
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: "true",
        };
        return date.toLocaleDateString([], options).replace(" at ", " ");
    };

    useEffect(() => {
        setTimeInfo(updateTimeInfo());

        const interval = setInterval(() => {
            setTimeInfo(updateTimeInfo);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const getTemperatureImage = (temp) => {
        if (temp <= 16) return lowTemperature;
        if(temp <= 30) return normalTemperature;
        return hotTemperature;
    };

    const isDayOrNight = (index) => {
        return index === 1 ? day : night; 
    };

    const getRegionName = (region) => {
        if(!region) return "";
        const parts = region.split(",");
        return parts.length > 1 ? parts[1].trim() : parts[0];
    };


    const searchedLocation = weatherData?.location;
    const currentTemperature = weatherData?.current?.heatindex_c?.toFixed(1) ?? weatherData?.current?.temp_c?.toFixed(1);
    const feelsLikeTemp = weatherData?.current?.feelslike_c;
    const currentCondition = weatherData?.current?.condition;
    const dayOrNightIndex = weatherData?.current?.is_day;
    const precipitation = weatherData?.current?.precip_mm.toFixed(1);
    const humidity = weatherData?.current?.humidity;
    const wind = weatherData?.current?.wind_kph;
    const aqi = weatherData?.current?.air_quality;
    const hourData = weatherData?.forecast?.forecastday;

    return (
        <div className="current-weather-card">
            <div className="current-card">
                <div className="time-info">
                    <h3>{timeInfo}</h3>
                </div>
                <div className="location-info">
                    <div className="searched-location-element">
                        <img src={location} alt="location-icon" />
                        <h2>{searchedLocation?.name}</h2>
                    </div>
                    <div className="state-country-element">
                        <h3>{getRegionName(searchedLocation?.region)}, {searchedLocation?.country}</h3>
                        <img src={isDayOrNight(dayOrNightIndex)} />
                    </div>  
                </div>
                <div className="condition-temp-wind-humidity-div">
                    <div className="condition-element">
                        <div className="temperature">
                            <h3>Temperature:</h3>
                            <div className="current-temp">
                                <img src={getTemperatureImage(parseFloat(currentTemperature))} alt="temperature-indicator"/>
                                <h2>{currentTemperature}°C</h2>
                            </div>
                            <h3>Feels like: {feelsLikeTemp}°C</h3>
                        </div>
                        <div className="current-condition">
                            <img src={currentCondition?.icon} alt="current-condition"/>
                            <h3>{currentCondition?.text}</h3>
                            <p>Precipitation: {precipitation} mm</p>
                        </div>
                    </div>
                    <div className="wind-humidity-element">
                        <div className="humidity-element">
                            <img src={humidityImg} alt="humidity-icon" />
                            <div>
                                <h3>{humidity?.toFixed(0)}%</h3>
                                <h4>Humidity</h4>
                            </div>
                        </div>
                        <div className="wind-element">
                            <img src={windImg} alt="wind-icon" />
                            <div>
                                <h3>{wind?.toFixed(1)} Km/h</h3>
                                <h4>Wind Speed</h4>
                            </div>
                        </div>
                    </div>
                    <div className="aqi">
                        <AqiDetails aqiData={aqi}/>
                    </div>
                </div> 
            </div>
            <div className="hourly-forecast">
                <HourlyForecast hourlyForecastData={hourData[0]} />
            </div>
        </div>
    );
};

export default WeatherDataCard;