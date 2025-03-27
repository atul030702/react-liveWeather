import { useOutletContext } from "react-router";
import { useState } from "react";
import Next2DayForecast from "./Next2DayForecast.js";
import Hour from "./Hour.js";

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
                        {filteredArray.map((object) => {
                            return <Hour key={object?.time_epoch} obj={object}/>
                        })}
                    </div>
                </div>
            </div>
            <div className="future-forecast">
                {data.map((obj) => (
                    <Next2DayForecast key={obj?.time_epoch} data={obj}/>
                ))}
            </div>
        </div>
    );
};

export default Forecast;