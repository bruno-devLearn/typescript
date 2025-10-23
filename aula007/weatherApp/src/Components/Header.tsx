import { Link } from "react-router";

export function Header() {
    return (
        <header>
            <h1>
                <Link to="/">Weather App</Link>
            </h1>
        </header>
    );
}
