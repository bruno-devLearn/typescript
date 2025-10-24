import { useWeather } from "../../../ts/store";

export function Input() {
    const { input, updateInput } = useWeather();

    return (
        <div className="input-div">
            <input
                type="text"
                placeholder="Search city..."
                value={input}
                onChange={(e) => updateInput(e.target.value)}
            />
        </div>
    );
}
