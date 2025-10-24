import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router";
import { useWeather } from "../../../ts/store";

export function Empty() {
    return (
        <div className="empty">
            <div className="icon">
                <CiSearch />
            </div>
            <div className="text">
                <p className="title">Enter the name of a city</p>
                <p className="desc">to search for weather information</p>
            </div>
        </div>
    );
}

export function NotFound() {
    return (
        <div className="empty">
            <div className="icon">
                <CiSearch />
            </div>
            <div className="text">
                <p className="title">Try searching with a different name</p>
                <p className="desc">to search for weather information</p>
            </div>
        </div>
    );
}

export function TableResult() {
    const { weatherData, updateCity } = useWeather();

    return (
        <div className="table-content">
            {weatherData?.map((city) => (
                <NavLink
                    to="/city"
                    key={crypto.randomUUID()}
                    onClick={() => updateCity(city)}
                >
                    <div className="table-card">
                        <div className="city">
                            <h2>{city.location.name}</h2>
                            <span>{city.current.condition.text}</span>
                        </div>
                        <div className="temp">
                            {Math.floor(city.current.temp_c)}°
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}
