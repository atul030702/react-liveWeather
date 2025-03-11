import { useEffect, useState } from "react";

import my_location from "../assets/my_location.svg";
import search from "../assets/search.svg";
import { Separator } from "./Separator.js";
import { url } from "../utils.js";

import WeatherDataCard from "./CurrentWeatherCard.js";

const SearchArea = () => {
    const [searchText, setSearchText] = useState("");
    const [weather, setWeather] = useState(null);
    const [placeholder, setPlaceholder] = useState("Enter City Name");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const weatherDataFromAPI =async (city) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}&q=${city}&days=7&aqi=yes`);
            if(!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            console.log(data);
            setWeather(data);
            setError("");
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
            setWeather(null);
            setError("City not found. Try again");
        }finally{
            setLoading(false);
        }
    };
    

    const handleSearch = () => {
        const trimmedText = searchText.trim();
        if(!trimmedText) {
            setPlaceholder("Enter a valid city name to proceed");
            setSearchText("");
            return;
        }
        weatherDataFromAPI(trimmedText);
        setSearchText("");
    };
    
    return (
        <div>
            <div className="search-box">
                <button className="location-icon">
                    <img src={my_location} alt="my-location-icon"/>
                </button>
                <Separator />
                <input 
                    type="text" 
                    required 
                    placeholder={placeholder}
                    value={searchText} 
                    className="input-box"
                    onChange={(e) => {setSearchText(e.target.value);}}
                    onFocus={() => {setPlaceholder("Enter City Name")}}
                />
                <Separator />
                <button 
                    className="search-image"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    <img src={search} alt="search-icon" />
                </button>
            </div>
            <div className="weather-details">
                <p className="error-message">{error}</p>
                <WeatherDataCard weatherData={weather} />
            </div>
        </div>
    );
        
};

export default SearchArea;