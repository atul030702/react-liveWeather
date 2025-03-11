import { useState, useEffect } from "react";

import location from "../assets/location.svg";
import hotTemperature from "../assets/temperature_high.svg";
import normalTemperature from "../assets/normal_temperature.svg";
import lowTemperature from "../assets/temperature_low.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";

const WeatherDataCard = (props) => {
    const { weatherData } = props;
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
        console.log(date);
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

    return (
        <div className="current-weather-card">
            <div className="current-card">
                <div className="time-info">
                    <h3>{updateTimeInfo()}</h3>
                </div>
                <div className="location-info">
                    <img src={location} alt="location-icon" />
                    <h2>{searchedLocation?.name},</h2>
                    <h3>{getRegionName(searchedLocation?.region)}</h3>
                    <img src={isDayOrNight(dayOrNightIndex)} />
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
                    <div className="current-condition">
                        <img src={currentCondition?.icon} alt="current-condition"/>
                        <h3>{currentCondition?.text}</h3>
                        <p>Precipitation: {precipitation} mm</p>
                    </div>
                </div>
            </div>
            <div className="hourly-forecast"></div>
        </div>
    );
};

export default WeatherDataCard;