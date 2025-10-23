import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router";

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
    return (
        <div className="table-content">
            <NavLink to="/city">
                <div className="table-card">
                    <div className="city">
                        <h2>São Paulo</h2>
                        <span>Ensolarado</span>
                    </div>
                    <div className="temp">25°</div>
                </div>
            </NavLink>
        </div>
    );
}
