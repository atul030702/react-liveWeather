import { useOutletContext } from "react-router";
import { useState } from "react";

import humidityIcon from "../assets/humidity_percentage.svg";
import windIcon from "../assets/windy.svg";
import normalTempIcon from "../assets/normal_temperature.svg";
import lowTempIcon from "../assets/temperature_low.svg";
import highTempIcon from "../assets/temperature_high.svg";
import visibilityIcon from "../assets/visibility.svg";
import uvIcon from "../assets/uv-index.png";

const Forecast = () => {
    const { weatherData } = useOutletContext();
    console.log(weatherData);
    if(!weatherData) return null;

    function dateAndTime(string) {
        let stringArray = string.split(" ");
        let dateString = stringArray[0].split("-").reverse().join("/");
        stringArray.splice(0, 1, dateString);
        return stringArray;
    }

    function filterFutureHours(arr, lastUpdatedTime) {
        if(!arr || !lastUpdatedTime) {
            return []
        }else{
            return arr.filter((hour) => hour?.time_epoch > lastUpdatedTime);
        }
    }

    function timeStr(str) {
        let subStr = str.split(" ");
        return subStr[1];
    }

    function returnTempImg(tempData) {
        if(tempData <= 16) {
            return lowTempIcon;
        }else if(tempData <= 30) {
            return normalTempIcon;
        }else {
            return highTempIcon;
        }
    }

    const localTime = weatherData?.current?.last_updated;
    const lastUpdatedTimeEpoch = weatherData?.current?.last_updated_epoch;
    const locationName = weatherData?.location;
    const todaysForecast = weatherData?.forecast?.forecastday?.[0];
    console.log(todaysForecast);
    const getHour = todaysForecast?.hour;

    const filteredArray = filterFutureHours(getHour, lastUpdatedTimeEpoch);

    return (
        <div className="forecast-container">
            <div className="hourly-forecast">
                <div className="header">
                    <div>
                        <h2>Hourly Weather</h2>
                        <p>- {locationName?.name}, {locationName?.country} </p>
                    </div>
                    <h4>As of {dateAndTime(localTime)[1]} (local-time)</h4>
                </div>
                <div className="body">
                    <h3>{dateAndTime(localTime)[0]}</h3>
                    <div className="body-content">
                        {filteredArray.map((obj) => {
                            return (
                                <div key={obj?.time_epoch} className="hour-element">
                                    <div className="first-column">
                                        <h4>{timeStr(obj?.time)}</h4>
                                        <div className="temp-element">
                                            <img src={returnTempImg(obj?.temp_c)} alt="temp-icon" />
                                            <p>{obj?.temp_c}°C</p>
                                        </div>
                                        <div className="condition-element">
                                            <img src={obj?.condition?.icon} alt="condition-icon"/>
                                            <h4>{obj?.condition?.text}</h4>
                                        </div>
                                        <div className="wind-element">
                                            <img src={windIcon} alt="wind-icon" />
                                            <h4>{obj?.wind_dir} {obj?.wind_kph}Km/Hr</h4>
                                        </div>
                                    </div>
                                    <div className="second-column">
                                        <h4 className="feels-like-element">Feels Like: {obj?.feelslike_c}°C</h4>
                                        <div className="humidity-element">
                                            <img src={humidityIcon} alt="humidity-icon" />
                                            <h4>{obj?.humidity}%</h4>
                                        </div>
                                        <div className="visibility-element">
                                            <img src={visibilityIcon} alt="visibility-icon"/>
                                            <h4>{obj?.vis_km} Km</h4>
                                        </div>
                                        <div className="uv-element">
                                            <img src={uvIcon} alt="uv-icon"/>
                                            <h4>UV Index: {obj?.uv} of 11</h4>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="future-forecast">

            </div>
        </div>
    );
};

export default Forecast;