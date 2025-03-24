import { useState } from "react";

import humidityPercentIcon from "../assets/humidity_percentage.svg";
import humidityIcon from "../assets/humidity.svg";
import windIcon from "../assets/windy.svg";
import normalTempIcon from "../assets/normal_temperature.svg";
import lowTempIcon from "../assets/temperature_low.svg";
import highTempIcon from "../assets/temperature_high.svg";
import minMaxTempIcon from "../assets/thermostat.svg";
import visibilityIcon from "../assets/visibility.svg";
import uvIcon from "../assets/uv-index.png";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

const Next2DayForecast = ({ data }) => {
    console.log(data);

    const [expand, setExpand] = useState(false);

    function changeTheIcon() {
        (previousState) => !previousState;
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

    return (
        <div className="future-forecast">
            <div className="coming-day-forecast">
                <div className="coming-day-header">
                    <h3>{formatDate(localDate)}</h3>
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
                        <img src={uvIcon} alt="uv-icon"/>
                        <div className="first-depth">
                            <p>UV Index:</p>
                            <h4>{formatNumber(uvForDay)} of 11</h4>
                        </div>
                    </div>
                    <div className="prediction">
                        <h4>Prediction for Rain: {formatNumber(rainChanceForDay)}</h4>
                        <h4>Prediction for Snow: {formatNumber(snowChanceForDay)}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Next2DayForecast;