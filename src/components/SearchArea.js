import my_location from "../assets/my_location.svg";
import search from "../assets/search.svg";
import { Separator } from "./Separator.js";

const SearchArea = () => {
    return (
        <div className="search-box">
            <button className="location-icon">
                <img src={my_location} alt="my-location-icon"/>
            </button>
            <Separator />
            <input type="text" required placeholder="Enter City Name" className="input-box"/>
            <Separator />
            <button className="search-image">
                <img src={search} alt="search-icon" />
            </button>
        </div>
    );
};

export default SearchArea;