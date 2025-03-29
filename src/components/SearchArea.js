import { useState } from "react";
import Autocomplete from "./Autocomplete.js";

import my_location from "../assets/my_location.svg";
import search from "../assets/search.svg";
import { Separator } from "./Separator.js";
import { url } from "../utils.js";

const SearchArea = ({ setWeatherData, setError, setLoading }) => {
    const [searchText, setSearchText] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter City Name");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const weatherDataFromAPI = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`${url}&q=${query}&days=3&aqi=yes`);
            if(!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeatherData(data);
            setError("");
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
            setWeatherData(null);
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
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error("Geolocation error", error);
                    setError("Unable to fetch the location. Enable the location access");
                    setLoading(false);
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

    const handleKeyEvent = (e) => {
        if(!showSuggestions || searchResult.length === 0) return;

        if(e.key === "ArrowDown") {
            setSelectedIndex((prev) => (prev + 1) % searchResult.length);
        }else if(e.key === "ArrowUp") {
            setSelectedIndex((prev) => (prev === 0 ? searchResult.length - 1 : prev - 1));
        }else if(e.key === "Enter") {
            e.preventDefault()
            if(selectedIndex >= 0) {
                const selectedCity = `${searchResult[selectedIndex].name}, ${searchResult[selectedIndex].country}`
                setSearchText(selectedCity);
                setShowSuggestions(false);
                weatherDataFromAPI(selectedCity);
                setSearchText("")
            }else{
                handleSearch();
            }
        }
    };
    
    return (
        <div className="search-element">
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
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setSelectedIndex(-1);
                        if(e.target.value.trim().length > 0) {
                            setShowSuggestions(true);
                        }else{
                            setShowSuggestions(false)
                        }
                    }}
                    onFocus={() => {
                        setPlaceholder("Enter City Name");
                        document.documentElement.style.setProperty("--placeholder-color", "#a0a0a0");
                        if(searchText.trim().length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    onBlur={ () => setShowSuggestions(false) }
                    onKeyDown={ (e) => handleKeyEvent(e) }
                />
                <Separator />
                <button className="search-image" onClick={handleSearch}>
                    <img src={search} alt="search-icon" />
                </button>
            </div>

            <Autocomplete 
                query={searchText} 
                setQuery={setSearchText}
                showSuggestion={showSuggestions}
                setShowSuggestion={setShowSuggestions}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />

        </div>
    );
        
};

export default SearchArea;