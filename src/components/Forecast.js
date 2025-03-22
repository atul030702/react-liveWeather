import { useOutletContext } from "react-router";
import { useState } from "react";
import Next2DayForecast from "./Next2DayForecast.js";

import humidityIcon from "../assets/humidity_percentage.svg";
import windIcon from "../assets/windy.svg";
import normalTempIcon from "../assets/normal_temperature.svg";
import lowTempIcon from "../assets/temperature_low.svg";
import highTempIcon from "../assets/temperature_high.svg";
import visibilityIcon from "../assets/visibility.svg";
import uvIcon from "../assets/uv-index.png";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

const Forecast = () => {
    const { weatherData } = useOutletContext();
    if(!weatherData) return null;

    const [isExpanded, setIsExpanded] = useState(true);

    function toggleExpansion() {
        setIsExpanded((previousState) => !previousState);
    }
    function toggleIcon(boolean) {
        return boolean === true ? arrowUpIcon : arrowDownIcon;
    }

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

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }

    const dataForNext2Days = weatherData?.forecast?.forecastday;
    const filterData2Days = (array) => {
        const newArray = []
        if(array.length === 1) {
            newArray;
        }else if(array.length === 2) {
            newArray.push(array[1]);
        }else if(array.length === 3) {  
            newArray.push(array[1], array[2]);
        }else{ newArray}
        return newArray;
    };
    const data = filterData2Days(dataForNext2Days);


    const localTime = weatherData?.current?.last_updated;
    const lastUpdatedTimeEpoch = weatherData?.current?.last_updated_epoch;
    const locationName = weatherData?.location;
    const todaysForecast = weatherData?.forecast?.forecastday?.[0];
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
                    <div className="toggle-element">
                        <h3>{dateAndTime(localTime)[0]}</h3>
                        <button className="toggle-btn"
                            onClick={toggleExpansion}
                        >
                            <img src={toggleIcon(isExpanded)} alt="toggle-icon"/>
                        </button>
                    </div>
                    <div className={`body-content ${isExpanded ? "expanded" : "collapsed"}`}>
                        {filteredArray.map((obj) => {
                            return (
                                <div key={obj?.time_epoch} className="hour-element">
                                    <div className="first-column">
                                        <h4>{timeStr(obj?.time)}</h4>
                                        <div className="temp-element">
                                            <img src={returnTempImg(obj?.temp_c)} alt="temp-icon" />
                                            <p>{formatNumber(obj?.temp_c)}°C</p>
                                        </div>
                                        <div className="condition-element">
                                            <img src={obj?.condition?.icon} alt="condition-icon"/>
                                            <h4>{obj?.condition?.text}</h4>
                                        </div>
                                        <div className="wind-element">
                                            <img src={windIcon} alt="wind-icon" />
                                            <div>
                                                <p>Wind</p>
                                                <h4>{obj?.wind_dir} {formatNumber(obj?.wind_kph)}Km/Hr</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="second-column">
                                        <h4 className="feels-like-element">Feels Like: {formatNumber(obj?.feelslike_c)}°C</h4>
                                        <div className="humidity-element">
                                            <img src={humidityIcon} alt="humidity-icon" />
                                            <div>
                                                <p>Humidity</p>
                                                <h4>{formatNumber(obj?.humidity)}%</h4>
                                            </div>
                                            
                                        </div>
                                        <div className="visibility-element">
                                            <img src={visibilityIcon} alt="visibility-icon"/>
                                            <div>
                                                <p>Visibility</p>
                                                <h4>{formatNumber(obj?.vis_km)} Km</h4>
                                            </div>
                                        </div>
                                        <div className="uv-element">
                                            <img src={uvIcon} alt="uv-icon"/>
                                            <h4>UV Index: {formatNumber(obj?.uv)} of 11</h4>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="future-forecast">
                {data.map((obj) => (
                    <Next2DayForecast key={obj?.date_epoch} data={obj}/>
                ))}
            </div>
        </div>
    );
};

export default Forecast;