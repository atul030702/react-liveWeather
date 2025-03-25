import { useState } from "react";

import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <p>Powered by 
                    <a href="https://www.weatherapi.com" target="_blank" rel="noopener noreferrer">weatherAPI</a>
                </p>
                <p>Made with 💟 by Atul©</p>
            </div>

            <div className="social-links">
                <p>Social Links-</p>
                <a href="https://github.com/atul030702/react-liveWeather" target="_blank" rel="noopener noreferrer">
                    <img src={github} className="social-icon" loading="lazy"/>
                </a>
                <a href="https://www.linkedin.com/in/atul-kumar-b8a33b2a2" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} className="social-icon" loading="lazy"/>
                </a>
            </div>
        </div>
    );
};

export default Footer;