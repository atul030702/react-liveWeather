import { useState } from "react";

const Header = () => {
    return (
        <div className="app-header">
            <div className="header-text">
                <h1>SU30 Weather</h1>
                <p>Current</p>
                <p>7-day forecast</p>
                <p>Air quality</p>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;