const Shimmer = () => {
    return (
        <div className="shimmer-element">
            <div className="current-card-shimmer">
                <div className="date-card"></div>

                <div className="location-card"></div>

                <div className="condition-card">
                    <div className="temp-card"></div>

                    <div className="humidity-visibility-card">
                        <div className="humidity-card"></div>
                        <div className="visibility-card"></div>
                    </div>

                    <div className="wind-pressure-card">
                        <div className="wind-card"></div>
                        <div className="pressure-card"></div>
                    </div>

                    <div className="description-card"></div>
                </div>

                <div className="aqi-card"></div>
            </div>
            <div className="day-forecast-card">
                <div className="body-card"></div>
            </div>
        </div>
    );
};

export default Shimmer;