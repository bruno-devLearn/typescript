import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router";

export function Result() {
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
                        <h2>São Paulo</h2>
                        <p>São Paulo, Brazil</p>
                    </div>
                    <div className="city-content">
                        <div className="img">
                            <img src="https://cdn.weatherapi.com/weather/64x64/day/113.png" />
                        </div>
                        <div className="temp">25°C</div>
                        <p className="condition">Ensolarado</p>
                        <div className="feel">Thermal sensation: 27°C</div>
                    </div>
                    <div className="infos">
                        <div className="info">
                            <div className="title">Wind</div>
                            <div className="desc">15 km/h</div>
                        </div>
                        <div className="info">
                            <div className="title">Humidity</div>
                            <div className="desc">60%</div>
                        </div>
                        <div className="info">
                            <div className="title">UV</div>
                            <div className="desc">7</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
