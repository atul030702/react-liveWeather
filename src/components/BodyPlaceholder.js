import { useState } from "react";

import WeatherDataCard from "./CurrentWeatherCard.js";
import SearchArea from "./SearchArea.js";
import backgroundImage from "../assets/backgroundImage.webp";

const BodyPlaceholder = ({ weatherData, setWeatherData }) => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="placeholder-container">
            <div className="placeholder-img">
                <img src={backgroundImage} loading="lazy"
                    alt="weather-background-img" 
                    className="weather-image"
                />
                <div className="image-text">
                    <h1>Find detailed weather information for</h1>
                    <p>Discover accurate weather updates and air quality index for any place!</p>
                </div>
            </div>
            <div className="search-area">
                <SearchArea setWeatherData={setWeatherData} setError={setError} setLoading={setLoading}/>
            </div>
            
            {weatherData ? (
                <WeatherDataCard weatherData={weatherData} error={error} loading={loading}/>
            ) : (
                <div className="carousel">
                    <h3>Planning a trip or trek? Check the weather before heading to these beautiful places.</h3>
                </div>
            )}  

        </div>
    );
};

export default BodyPlaceholder;