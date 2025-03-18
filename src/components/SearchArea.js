import { useState } from "react";

import my_location from "../assets/my_location.svg";
import search from "../assets/search.svg";
import { Separator } from "./Separator.js";
import { url } from "../utils.js";

const SearchArea = ({ setWeather, setError, setLoading }) => {
    const [searchText, setSearchText] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter City Name");

    const weatherDataFromAPI = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}&q=${query}&days=3&aqi=yes`);
            if(!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();

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
    
    async function getUserLocation() {
        setLoading(true);
        try {
            if(!navigator.geolocation) {
                setLoading(false);
                setError("Geolocation is not supported by your browser");
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        await weatherDataFromAPI(`${lat}, ${lon}`);
                    } catch (error) {
                        console.error(`Error fetching data: ${error}`);
                        setError("Failed to fetch weather data for your location");
                    }
                },
                (error) => {
                    console.error("Geolocation error", error);
                    setError("Unable to fetch the location. Enable the location access");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }

    const handleSearch = () => {
        const trimmedText = searchText.trim();
        if(!trimmedText) {
            setPlaceholder("Enter a valid city name");
            document.documentElement.style.setProperty("--placeholder-color", "red")
            setSearchText("");
            return;
        }
        weatherDataFromAPI(trimmedText);
        setSearchText("");
    };
    
    return (
        <div>
            <div className="search-box">
                <button className="location-icon" onClick={getUserLocation}>
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
                    onFocus={() => {
                        setPlaceholder("Enter City Name");
                        document.documentElement.style.setProperty("--placeholder-color", "#a0a0a0");
                    }}
                />
                <Separator />
                <button className="search-image" onClick={handleSearch}>
                    <img src={search} alt="search-icon" />
                </button>
            </div>
        </div>
    );
        
};

export default SearchArea;