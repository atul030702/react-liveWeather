



const HourlyForecast = ({ hourlyForecastData }) => {
    console.log(hourlyForecastData);

    const { day } = hourlyForecastData;
    
    const getUpcomingHourForecast = (hourlyData) => {

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
    }

    return (
        <div className="hourly-forecast-card">
            <h2>Today's Forecast:</h2>
            <hr style={{border: "1px solid #000"}} />
            <div className="body-element">
                <div>
                    <img src="" alt="weather-description-image" />
                    <h2>{} °C</h2>
                    <h3>{}</h3>
                </div>
                <div>
                    <h4>Feels Like: {}°C</h4>
                    <h4>Humidity: {}%</h4>
                    <h4>Wind: {}Km/h</h4>
                    <h4>Precipitation: {}mm</h4>
                </div>
            </div>
        </div>
    );

}

export default HourlyForecast;