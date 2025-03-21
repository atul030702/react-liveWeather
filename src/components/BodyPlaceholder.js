import { useState } from "react";

import WeatherDataCard from "./CurrentWeatherCard.js";
import SearchArea from "./SearchArea.js";
import backgroundImage from "../assets/backgroundImage.png";

const BodyPlaceholder = ({ weatherData, setWeatherData }) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="placeholder-container">
            <div className="placeholder-img">
                <img src={backgroundImage} alt="weather-background-img" className="weather-image"/>
                <div className="image-text">
                    <h1>Find detailed weather information for</h1>
                    <p>Discover accurate weather updates and air quality index for any place!</p>
                </div>
            </div>
            <div className="search-area">
                <SearchArea setWeatherData={setWeatherData} setError={setError} setLoading={setLoading}/>
            </div>
            
            <WeatherDataCard weatherData={weatherData} error={error} loading={loading}/>

        </div>
    )
};

export default BodyPlaceholder;