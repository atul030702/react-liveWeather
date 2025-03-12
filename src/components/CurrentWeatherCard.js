import { useState, useEffect } from "react";

import location from "../assets/location.svg";
import hotTemperature from "../assets/temperature_high.svg";
import normalTemperature from "../assets/normal_temperature.svg";
import lowTemperature from "../assets/temperature_low.svg";
import day from "../assets/day.svg";
import night from "../assets/night.svg";
import goodAqi from "../assets/aqi-good.svg";
import moderateAqi from "../assets/aqi-moderate.svg";
import unhealthyAqi from "../assets/aqi-unhealthy.svg";
import alertAqi from "../assets/aqi-alert.svg";
import hazardousAqi from "../assets/aqi-hazardous.svg";
import windImg from "../assets/windy.svg";
import humidityImg from "../assets/humidity_percentage.svg";

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

    const getAqiImage = (index) => {
        switch(index) {
            case 1: return goodAqi;
            case 2: return goodAqi;
            case 3: return moderateAqi;
            case 4: return unhealthyAqi;
            case 5: return alertAqi;
            case 6: return hazardousAqi;
            default: return;
        };
    };
    const getAQIColor = (value, type) => {
        if (type === "pm2_5" || type === "pm10") {
            if (value <= 12) return "#00E400";
            if (value <= 35) return "#FFFF00";
            if (value <= 55) return "#FF7E00";
            if (value <= 150) return "#FF0000";
            if (value <= 250) return "#8F3F97";
            return "#7E0023";
        } else if (type === "so2" || type === "o3") {
            if (value <= 20) return "#00E400";
            if (value <= 75) return "#FFFF00";
            if (value <= 185) return "#FF7E00";
            if (value <= 304) return "#FF0000";
            if (value <= 604) return "#8F3F97";
            return "#7E0023";
        }
    };

    const searchedLocation = weatherData?.location;
    const currentTemperature = weatherData?.current?.heatindex_c?.toFixed(1) ?? weatherData?.current?.temp_c?.toFixed(1);
    const feelsLikeTemp = weatherData?.current?.feelslike_c;
    const currentCondition = weatherData?.current?.condition;
    const dayOrNightIndex = weatherData?.current?.is_day;
    const precipitation = weatherData?.current?.precip_mm.toFixed(1);
    const aqiEpaIndex = weatherData?.current?.air_quality["us-epa-index"];
    const {pm2_5, pm10, o3, so2} = weatherData?.current?.air_quality || {};
    const humidity = weatherData?.current?.humidity;
    const wind = weatherData?.current?.wind_kph;
    console.log(humidity, wind);

    return (
        <div className="weather-container">
            <div className="current-weather-card">
            <div className="current-card">
                <div className="time-info">
                    <h3>{updateTimeInfo()}</h3>
                </div>
                <div className="location-info">
                    <img src={location} alt="location-icon" />
                    <h2>{searchedLocation?.name},</h2>
                    <h3>{getRegionName(searchedLocation?.region)}, {searchedLocation?.country}</h3>
                    <img src={isDayOrNight(dayOrNightIndex)} />
                </div>
                <div className="aqi-element">
                    <h2 className="aqi-heading">Air Quality Index
                        (<img src={getAqiImage(aqiEpaIndex)} alt="aqi-image"/>)
                    </h2>
                    <div className="aqi-body">
                        <div>
                            <h4>PM2.5</h4>
                            <h3 style={{color:getAQIColor(pm2_5, "pm2_5")}}>
                                {pm2_5?.toFixed(1)} µg/m³
                            </h3>
                        </div>
                        <div>
                            <h4>PM10</h4>
                            <h3 style={{color:getAQIColor(pm10, "pm10")}}>
                                {pm10?.toFixed(1)} µg/m³
                            </h3>
                        </div>
                        <div>
                            <h4>Ozone</h4>
                            <h3 style={{color:getAQIColor(o3, "o3")}}>
                                {o3?.toFixed(1)} µg/m³
                            </h3>
                        </div>
                        <div>
                            <h4>SO<sub>2</sub></h4>
                            <h3 style={{color:getAQIColor(so2, "so2")}}>
                                {so2?.toFixed(1)} µg/m³
                            </h3>
                        </div>
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
                </div> 
            </div>
            <div className="hourly-forecast"></div>
            </div>
        </div>
    );
};

export default WeatherDataCard;