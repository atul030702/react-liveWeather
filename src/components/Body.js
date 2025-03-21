import { useOutletContext } from "react-router";
import BodyPlaceholder from "./BodyPlaceholder.js";

const Body = () => {
    const { weatherData, setWeatherData } = useOutletContext();
    
    return (
        <div className="body-container">
            <BodyPlaceholder weatherData={weatherData} setWeatherData={setWeatherData} />
        </div>
    );
};

export default Body;