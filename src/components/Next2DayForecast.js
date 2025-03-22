import { useState } from "react";

import humidityIcon from "../assets/humidity_percentage.svg";
import windIcon from "../assets/windy.svg";
import normalTempIcon from "../assets/normal_temperature.svg";
import lowTempIcon from "../assets/temperature_low.svg";
import highTempIcon from "../assets/temperature_high.svg";
import visibilityIcon from "../assets/visibility.svg";
import uvIcon from "../assets/uv-index.png";
import arrowUpIcon from "../assets/arrowUp.svg";
import arrowDownIcon from "../assets/arrowDown.svg";

const Next2DayForecast = ({ data }) => {
    console.log(data);

    const [expand, setExpand] = useState(false);

    function changeTheIcon() {
        (previousState) => !previousState;
    }
    function chooseIcon(boolean) {
        return boolean === true ? arrowUpIcon : arrowDownIcon;
    }

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }

    return (
        <div className="future-forecast">
            <div className="current-day-forecast">
                <div className="current-day-header">
                    <h3>date</h3>
                </div>
            </div>
        </div>
    );
};

export default Next2DayForecast;