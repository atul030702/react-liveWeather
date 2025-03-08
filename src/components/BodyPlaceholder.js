import { useState, useEffect } from "react";

import SearchArea from "./SearchArea.js";
import backgroundImage from "../assets/backgroundImage.png";

const BodyPlaceholder = () => {
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
                <SearchArea />
            </div>
        </div>
    )
};

export default BodyPlaceholder;