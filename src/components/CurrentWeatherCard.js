import { useState, useEffect } from "react";
import AqiDetails from "./AqiDetail.js";
import DayForecast from "./DayForecast.js";
import Shimmer from "./Shimmer.js";

import location from "../assets/location.svg";
import hotTemperature from "../assets/temperature_high.svg";
import normalTemperature from "../assets/normal_temperature.svg";
import lowTemperature from "../assets/temperature_low.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";
import windImg from "../assets/windy.svg";
import humidityImg from "../assets/humidity_percentage.svg";
import visibilityImg from "../assets/visibility.svg";
import pressureImg from "../assets/pressure.svg";

const WeatherDataCard = ({ weatherData, error, loading }) => {

    const [timeInfo, setTimeInfo] = useState("");
    const [showShimmer, setShowShimmer] = useState(false);

    useEffect(() => {
        if (loading) {
            setShowShimmer(true);
        }

        const timer = setTimeout(() => {
            setShowShimmer(false);
        }, 750);

        return () => clearTimeout(timer);
    }, [loading]);

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
            setTimeInfo(updateTimeInfo());
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    if(!weatherData) return null;
    if(showShimmer) return <Shimmer/>;
    console.log(weatherData);

    const getTemperatureImage = (temp) => {
        if (temp <= 16) return lowTemperature;
        if(temp <= 30) return normalTemperature;
        return hotTemperature;
    };

    const isDayOrNight = (index) => {
        return index === 1 ? day : night; 
    };

    const getRegionName = (region) => {
        if(!region || typeof region !== "string") return "";
        const parts = region.split(",");
        return parts.length > 1 ? parts[1].trim() : parts[0];
    };

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }


    const searchedLocation = weatherData?.location;
    const currentTemperature = formatNumber(weatherData?.current?.heatindex_c) ?? formatNumber(weatherData?.current?.temp_c) ?? "--";
    const feelsLikeTemp = formatNumber(weatherData?.current?.feelslike_c);
    const currentCondition = weatherData?.current?.condition;
    const dayOrNightIndex = weatherData?.current?.is_day;
    const precipitation = formatNumber(weatherData?.current?.precip_mm);
    const humidity = formatNumber(weatherData?.current?.humidity);
    const visibility = formatNumber(weatherData?.current?.vis_km);
    const wind = formatNumber(weatherData?.current?.wind_kph);
    const pressure = formatNumber(weatherData?.current?.pressure_mb);
    const aqi = weatherData?.current?.air_quality;
    const dayData = weatherData?.forecast?.forecastday;

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
                        <img src={isDayOrNight(dayOrNightIndex)} alt="day-or-night-icon"/>
                    </div>  
                </div>
                
                <div className="condition-element">
                    <div className="temperature">
                        <h3>Temperature:</h3>
                        <div className="current-temp">
                                <img src={getTemperatureImage(parseFloat(currentTemperature))} alt="temperature-indicator"/>
                                <h2>{currentTemperature}°C</h2>
                        </div>
                        <h3>Feels like: {feelsLikeTemp}°C</h3>
                    </div>
                    
                    <div className="humidity-visibility-div">
                        <div className="humidity-element">
                            <img src={humidityImg} alt="humidity-icon" />
                            <div>
                                <h3>{humidity}%</h3>
                                <h4>Humidity</h4>
                            </div>
                        </div>
                        <div className="visibility-element">
                            <img src={visibilityImg} alt="visibility-icon"/>
                            <div>
                                <h3>{visibility} Km</h3>
                                <h4>Visibility</h4>
                            </div>
                        </div>
                    </div>

                    <div className="wind-pressure-div">
                        <div className="wind-element">
                            <img src={windImg} alt="wind-icon" />
                            <div>
                                <h3>{wind} Km/Hr</h3>
                                <h4>Wind Speed</h4>
                            </div>
                        </div>
                        <div className="pressure-element">
                            <img src={pressureImg} alt="pressure-icon"/>
                            <div>
                                <h3>{pressure} mb</h3>
                                <h4>Pressure</h4>
                            </div>
                        </div>
                    </div>

                    <div className="current-condition">
                        <img src={currentCondition?.icon} alt="current-condition"/>
                        <h3>{currentCondition?.text}</h3>
                        <p>Precipitation: {precipitation} mm</p>
                    </div>

                </div> 
                
                <div className="aqi">
                    <AqiDetails aqiData={aqi}/>
                </div>

            </div>
            <>
                <div className="day-forecast">
                    <DayForecast dayForecastData={dayData?.[0]} />
                </div>
            </>
        </div>
    );
};

export default WeatherDataCard;