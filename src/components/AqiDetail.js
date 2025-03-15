const AqiDetails = ({ aqiData }) => {
    if(!aqiData) return null;

    function aqiDescription(index) {
        switch (index) {
            case 1: return "Good";
            case 2: return "Satisfactory";
            case 3: return "Moderate";
            case 4: return "Poor";
            case 5: return "Very Poor";
            case 6: return "Severe";
            default: return null;
        };
    }

    const usEpaIndex = aqiData["us-epa-index"];
    const { pm2_5, pm10, o3, so2 } = aqiData || {};

    return (
        <div className="aqi-element">
            <div className="aqi-heading">
                <div className="aqi-header">
                    <h2 >Air Quality Index</h2>
                    <div className="aqi-description">
                        <p>{aqiDescription(usEpaIndex)}</p>
                    </div>
                </div>
                <div className="aqi-progress-bar"></div>
            </div>
            <div className="aqi-body">
                <div>
                    <h4>PM2.5</h4>
                    <h3>{pm2_5?.toFixed(1)}</h3>
                    <p>µg/m³</p>
                </div>
                <div>
                    <h4>PM10</h4>
                    <h3>{pm10?.toFixed(1)}</h3>
                    <p>µg/m³</p>
                </div>
                <div>
                    <h4>O<sub>3</sub></h4>
                    <h3>{o3?.toFixed(1)}</h3>
                    <p>µg/m³</p>
                </div>
                <div>
                    <h4>SO<sub>2</sub></h4>
                    <h3>{so2?.toFixed(1)}</h3>
                    <p>µg/m³</p>
                </div>
            </div>
        </div>
    );
};

export default AqiDetails;