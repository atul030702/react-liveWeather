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
    
    /**const getUpcomingHourForecast = (hourlyData) => {

        const currentEpoch = Math.floor(Date.now() / 1000);

        return hourlyData.filter((hour) => {
            hour.time_epoch >= currentEpoch;
        });
    };

    const formatTime12Hour = (timeEpoch) => {
        const date = new Date(timeEpoch * 1000);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${hours}: ${minutes} ${ampm}`;
    }*/

    return (
        <div className="day-forecast">
            <h2>Today's Weather Forecast</h2>
            <div className="body-element">
                <div>
                    <img src={condition?.icon} alt="weather-description-image"/>
                    <h4>{condition?.text}</h4>
                    
                </div>
                <div className="minmax-temperature">
                    <div>
                        <img src={minTempImg} alt="minimum-temperature-icon" />
                        <h3>Minimum Temperature: {mintemp_c?.toFixed(1)}°C</h3>
                    </div>

                    <div>
                        <img src={maxTempImg} alt="maximum-temperature-icon" />
                        <h3>Maximum Temperature: {maxtemp_c?.toFixed(1)}°C</h3>
                    </div>
                </div>
                <div>
                    <img src={avgHumidity} alt="average-humidity-icon" />
                    <h3>Average Humidity: {avghumidity}%</h3>
                </div>
                <div className="uv-element">
                    <img src={uvIndex} alt="uv-index-icon" />
                    <h3>UV Index: {uv}</h3>
                </div>
                <div>
                    <h4>Chance of Rain: {daily_chance_of_rain}</h4>
                    <h4>Chance of Snow: {daily_chance_of_snow}</h4>
                </div>
            </div>
        </div>
    );

}

export default DayForecast;