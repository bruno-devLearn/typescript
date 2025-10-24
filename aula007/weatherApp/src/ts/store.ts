import { create } from "zustand";

interface WeatherProps {
    input: string;
    weatherData: T[] | null;
    city: T | null;
    updateInput: (newValue: string) => void;
    updateWxData: (newData: T[]) => void;
    updateCity: (newData: T) => void;
}

export const useWeather = create<WeatherProps>((set) => ({
    input: "",
    weatherData: [],
    city: {},
    updateInput: (newValue) => set({ input: newValue }),
    updateWxData: (newData) => set({ weatherData: newData }),
    updateCity: (newData) => set({ city: newData }),
}));
