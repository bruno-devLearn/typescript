import { Empty, NotFound, TableResult } from "./Table-values";
import { useWeather } from "../../../ts/store";

export function Table() {
    const { weatherData, input } = useWeather();

    return (
        <div className="table">
            {input === "" ? (
                <Empty />
            ) : weatherData.length === 0 ? (
                <NotFound />
            ) : (
                <TableResult />
            )}
        </div>
    );
}
