import maxTempImg from "../assets/max_temp.svg";
import minTempImg from "../assets/min_temp.svg";
import avgHumidity from "../assets/humidity.svg";
import uvIndex from "../assets/uv-index.png";



const DayForecast = ({ dayForecastData }) => {
    console.log(dayForecastData);

    const { 
        avghumidity, 
        condition, 
        maxtemp_c, 
        mintemp_c,
        uv, 
        daily_chance_of_rain,
        daily_chance_of_snow,
    } = dayForecastData?.day;

    return (
        <div className="day-forecast-element">
            <h2 className="header-text">Today's Weather Forecast</h2>
            <div className="body-element">
                <div className="day-forecast-description">
                    <img src={condition?.icon} alt="weather-description-image"/>
                    <h4>{condition?.text}</h4>
                    
                </div>
                <div className="minmax-temperature">
                    <div>
                        <img src={minTempImg} alt="minimum-temperature-icon" />
                        <h3>Min Temperature: {mintemp_c?.toFixed(1)}°C</h3>
                    </div>

                    <div>
                        <img src={maxTempImg} alt="maximum-temperature-icon" />
                        <h3>Max Temperature: {maxtemp_c?.toFixed(1)}°C</h3>
                    </div>
                </div>
                <div className="avg-humidity-element">
                    <img src={avgHumidity} alt="average-humidity-icon" />
                    <h3>Average Humidity: {avghumidity}%</h3>
                </div>
                <div className="uv-element">
                    <img src={uvIndex} alt="uv-index-icon" />
                    <h3>UV Index: {uv}</h3>
                </div>
                <div className="chances-element">
                    <h4>Prediction for Rain: {daily_chance_of_rain?.toFixed(1)}%</h4>
                    <h4>Prediction for Snow: {daily_chance_of_snow?.toFixed(1)}%</h4>
                </div>
            </div>
        </div>
    );

}

export default DayForecast;