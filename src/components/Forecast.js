



const Forecast = () => {

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
    };

    return (
        <div className="forecast container">
            <div className="hourly-forecast"></div>
            <div className="upcoming-forecast"></div>
        </div>
    );
};

export default Forecast;