import humidityIcon from "../assets/humidity_percentage.svg";
import windIcon from "../assets/windy.svg";
import visibilityIcon from "../assets/visibility.svg";
import uvIcon from "../assets/uv-index.png";
import normalTempIcon from "../assets/normal_temperature.svg";
import lowTempIcon from "../assets/temperature_low.svg";
import highTempIcon from "../assets/temperature_high.svg";

const Hour = ({ obj }) => {

    function timeStr(str) {
        let subStr = str.split(" ");
        return subStr[1];
    }

    function formatNumber(value) {
        return Number.isInteger(value) ? value : value.toFixed(1);
    }

    function returnTempImg(tempData) {
        if(tempData <= 16) {
            return lowTempIcon;
        }else if(tempData <= 30) {
            return normalTempIcon;
        }else {
            return highTempIcon;
        }
    }

    return (
        <div className="hour-element">
            <div className="first-column">
                <h4>Time: {timeStr(obj?.time)}</h4>
                <div className="temp-element">
                    <img src={returnTempImg(obj?.temp_c)} alt="temp-icon" />
                    <p>{formatNumber(obj?.temp_c)}°C</p>
                </div>
                <div className="condition-element">
                    <img src={obj?.condition?.icon} alt="condition-icon"/>
                    <h4>{obj?.condition?.text}</h4>
                </div>
                <div className="wind-element">
                    <img src={windIcon} alt="wind-icon" />
                    <div>
                        <p>Wind</p>
                        <h4>{obj?.wind_dir} {formatNumber(obj?.wind_kph)}Km/Hr</h4>
                    </div>
                </div>
            </div>
            <div className="second-column">
                <h4 className="feels-like-element">Feels Like: {formatNumber(obj?.feelslike_c)}°C</h4>
                <div className="humidity-element">
                    <img src={humidityIcon} alt="humidity-icon" />
                    <div>
                        <p>Humidity</p>
                        <h4>{formatNumber(obj?.humidity)}%</h4>
                    </div>
                                            
                </div>
                <div className="visibility-element">
                    <img src={visibilityIcon} alt="visibility-icon"/>
                    <div>
                        <p>Visibility</p>
                        <h4>{formatNumber(obj?.vis_km)} Km</h4>
                    </div>
                </div>
                <div className="uv-element">
                    <img src={uvIcon} alt="uv-icon"/>
                    <h4>UV Index: {formatNumber(obj?.uv)} of 11</h4>
                </div>
            </div>
        </div>
    );

};

export default Hour;