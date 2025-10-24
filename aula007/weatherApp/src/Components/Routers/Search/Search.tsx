import { useEffect } from "react";
import { Input } from "./Input";
import { Table } from "./Table";
import { useWeather } from "../../../ts/store";
import { getsearch } from "../../../ts/getData";

export function Search() {
    const { input, updateWxData } = useWeather();

    useEffect(() => {
        async function fetcher() {
            if (input !== "") {
                const data = await getsearch(input);
                updateWxData(data);
            }
        }

        fetcher();
    }, [input, updateWxData]);

    return (
        <main className="search">
            <Input />
            <Table />
        </main>
    );
}
