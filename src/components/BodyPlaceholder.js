import { useState } from "react";

import WeatherDataCard from "./CurrentWeatherCard.js";
import SearchArea from "./SearchArea.js";
import backgroundImage from "../assets/backgroundImage.png";


const BodyPlaceholder = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

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
                <SearchArea setWeather={setWeather} setError={setError}/>
            </div>
            <WeatherDataCard weatherData={weather} error={error}/>
        </div>
    )
};

export default BodyPlaceholder;