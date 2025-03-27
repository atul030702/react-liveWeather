import { Link } from "react-router";

import usaFlag from "../assets/usa-flag.webp";
import { Separator } from "./Separator.js";

const Header = () => {
    return (
        <div className="app-header">
            <div className="header-text">
                <h1>SU30 Weather</h1>
                <p>Current</p>
                <Separator />
                <p>3-day forecast</p>
                <Separator />
                <div className="aqi-standard">
                    <p className="aqi-header">AQI Standard</p>
                    <div className="aqi-body">
                        <img src={usaFlag} alt="US-Flag"/>
                        <p>AQI-US</p>
                    </div>
                </div>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/forecast">Forecast</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;