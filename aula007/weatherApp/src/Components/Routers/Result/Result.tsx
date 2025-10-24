import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router";
import { useWeather } from "../../../ts/store";

export function Result() {
    const { city } = useWeather();

    return (
        <main className="result">
            <div className="result-page">
                <NavLink to="/">
                    <div className="back">
                        <div className="icon">
                            <FaArrowLeftLong />
                        </div>
                        Back
                    </div>
                </NavLink>
                <div className="content">
                    <div className="city-title">
                        <h2>{city.location.name}</h2>
                        <p>
                            {city.location.region}, {city.location.country}
                        </p>
                    </div>
                    <div className="city-content">
                        <div className="img">
                            <img src={city.current.condition.icon} />
                        </div>
                        <div className="temp">
                            {Math.floor(city.current.temp_c)}°C
                        </div>
                        <p className="condition">
                            {city.current.condition.text}
                        </p>
                        <div className="feel">
                            Thermal sensation:{" "}
                            {Math.floor(city.current.feelslike_c)}°C
                        </div>
                    </div>
                    <div className="infos">
                        <div className="info">
                            <div className="title">Wind</div>
                            <div className="desc">
                                {Math.floor(city.current.wind_kph)} km/h
                            </div>
                        </div>
                        <div className="info">
                            <div className="title">Humidity</div>
                            <div className="desc">{city.current.humidity}%</div>
                        </div>
                        <div className="info">
                            <div className="title">UV</div>
                            <div className="desc">{city.current.uv}</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
