import { useState, useEffect } from "react";
import { suggestionUrl } from "../utils.js";

const Autocomplete = ({ 
    query, setQuery,
    showSuggestion, setShowSuggestion, 
    searchResult, setSearchResult,
    selectedIndex, setSelectedIndex 
}) => {
    console.log(query);
    const [loading, setLoading] = useState(false);
    const [cache, setCache] = useState({});

    useEffect(() => {
        if(query.trim().length <= 2) {
            setSearchResult([]);
            setShowSuggestion(false);
            return;
        }
        setShowSuggestion(true);
        const debounceCall = setTimeout(() => fetchSuggestion(query), 350);
        return () => clearTimeout(debounceCall);

    }, [query]);


    async function fetchSuggestion(input) {
        setLoading(true);
        if(cache[input]) {
            console.log("cache return", input);
            setSearchResult(cache[input])
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${suggestionUrl}${input}`);
            const data = await response.json();
            const validData = Array.isArray(data) ? data : [];
            setSearchResult(validData);
            setCache((prev) => ( { ...prev, [input]: validData } ));
        } catch (error) {
           console.error(`Error fetching suggestions, ${error}`); 
        } finally {
            setLoading(false);
        }
    }

    const handleSelect = (city) => {
        setQuery(`${city?.name}, ${city?.country}`);
        setShowSuggestion(false);
    };

    function getRegionName(region) {
        if(!region || typeof region !== "string") return "";
        const parts = region.split(",");
        return parts.length > 1 ? parts[1].trim() : parts[0];
    }

    console.log(searchResult);

    return loading ? (<p className="loading-text">Loading...</p>) : showSuggestion && searchResult.length > 0 &&(
        <div 
            className="auto-suggestion"
            onMouseDown={(e) => e.preventDefault()}
        >
            <ul className="suggestion-list">
                {searchResult.map((city, index) => (
                    <li key={city?.id} 
                        className={`list-item ${index === selectedIndex ? "selected" : ""}`}
                        onMouseEnter={ () => setSelectedIndex(index) }
                        onClick = {() => handleSelect(city)}
                    >
                        {city?.name}, {city?.name !== city?.region ? getRegionName(city?.region) : city?.country}, {city?.country}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Autocomplete;