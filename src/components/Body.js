import { useState, useEffect } from "react";
import BodyPlaceholder from "./BodyPlaceholder.js";

import { url } from "../utils.js";

const Body = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(url);
            const response = await data.json();
            console.log(response);
            setWeatherData(response);
        }
        fetchData();
    }, []);
    
    return (
        <div className="body-container">
            <BodyPlaceholder />
        </div>
    );
};

export default Body;