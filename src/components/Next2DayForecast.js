import { useState } from "react";
import Hour from "./Hour.js";

import humidityIcon from "../assets/humidity.svg";
import minMaxTempIcon from "../assets/thermostat.svg";
import uvIcon from "../assets/uv-index.webp";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

const Next2DayForecast = ({ data }) => {
    if(!data) return null;
    console.log(data);

    const [expand, setExpand] = useState(false);

    function changeTheIcon() {
        setExpand((previousState) => !previousState);
    }
    function chooseIcon(boolean) {
        return boolean === true ? arrowUpIcon : arrowDownIcon;
    }

    function formatDate(string) {
        let strArray = string.split("-").reverse().join("/");
        return strArray;
    }

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }

    const localDate = data?.date;
    const maxTempForDay = data?.day?.maxtemp_c;
    const minTempForDay = data?.day?.mintemp_c;
    const avgHumidityForDay = data?.day?.avghumidity;
    const conditionForDay = data?.day?.condition;
    const uvForDay = data?.day?.uv;
    const rainChanceForDay = data?.day?.daily_chance_of_rain;
    const snowChanceForDay = data?.day?.daily_chance_of_snow;
    const hourArrayForDay = data?.hour;

    return (
        <div className="future-forecast">
            <div className="coming-day-forecast">
                <div className="coming-day-header">
                    <h3>Weather Outlook for {formatDate(localDate)}</h3>
                </div>

                <div className="coming-day-body">
                    <div  className="min-max-temp">
                        <img src={minMaxTempIcon} alt="thermostat-icon"/>
                        <div className="first-depth">
                            <p>Min / Max Temperature:</p>
                            <h4>{formatNumber(minTempForDay)}°C / {formatNumber(maxTempForDay)}°C </h4>
                        </div>
                    </div>
                    <div className="avg-humidity">
                        <img src={humidityIcon} alt="humidity-icon"/>
                        <div className="first-depth">
                            <p>Average Humidity:</p>
                            <h4>{formatNumber(avgHumidityForDay)}%</h4>
                        </div>
                        
                    </div>
                    <div className="day-condition">
                        <img src={conditionForDay?.icon} alt="condition-icon"/>
                        <h4>{conditionForDay?.text}</h4>
                    </div>
                    <div className="uv-details">
                        <img src={uvIcon} alt="uv-icon" className="uv-icon"/>
                        <div className="first-depth">
                            <p>UV Index:</p>
                            <h4>{formatNumber(uvForDay)} of 11</h4>
                        </div>
                    </div>
                    <div className="prediction">
                        <h4>Prediction for Rain: {formatNumber(rainChanceForDay)}%</h4>
                        <h4>Prediction for Snow: {formatNumber(snowChanceForDay)}%</h4>
                    </div>
                </div>
            </div>
            <div className="coming-day-hourly-forecast">
                <div className="hour-header">
                    <h3>Hourly Weather Data</h3>
                    <button className="toggle-btn"
                        onClick={changeTheIcon}
                    >
                        <img src={chooseIcon(expand)} alt="toggle-icon"/>
                    </button>
                </div>

                <div className={`hour-body ${expand ? "expanded" : "collapsed"}`}>
                    {hourArrayForDay.map((object) => (
                        <Hour key={object?.time_epoch} obj={object}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Next2DayForecast;