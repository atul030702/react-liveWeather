import maxTempImg from "../assets/max_temp.svg";
import minTempImg from "../assets/min_temp.svg";
import avgHumidity from "../assets/humidity.svg";
import uvIndex from "../assets/uv-index.webp";

const DayForecast = ({ dayForecastData }) => {

    const { 
        avghumidity, 
        condition, 
        maxtemp_c, 
        mintemp_c,
        uv, 
        daily_chance_of_rain,
        daily_chance_of_snow,
    } = dayForecastData?.day;

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }

    return (
        <div className="day-forecast-element">
                <p className="header-text">Today's Weather Outlook</p>
                <div className="day-forecast-description">
                    <img src={condition?.icon} alt="weather-description-image"/>
                    <h4>{condition?.text}</h4>
                    
                </div>
                <div className="minmax-temperature">
                    <div>
                        <img src={minTempImg} alt="minimum-temperature-icon" />
                        <h3>Min Temperature: {formatNumber(mintemp_c)}°C</h3>
                    </div>

                    <div>
                        <img src={maxTempImg} alt="maximum-temperature-icon" />
                        <h3>Max Temperature: {formatNumber(maxtemp_c)}°C</h3>
                    </div>
                </div>
                <div className="avg-humidity-element">
                    <img src={avgHumidity} alt="average-humidity-icon" />
                    <h3>Average Humidity: {formatNumber(avghumidity)}%</h3>
                </div>
                <div className="uv-element">
                    <img src={uvIndex} alt="uv-index-icon" />
                    <h3>UV Index: {formatNumber(uv)} of 11</h3>
                </div>
                <div className="chances-element">
                    <h4>Prediction for Rain: {formatNumber(daily_chance_of_rain)}%</h4>
                    <h4>Prediction for Snow: {formatNumber(daily_chance_of_snow)}%</h4>
                </div>

        </div>
    );

}

export default DayForecast;