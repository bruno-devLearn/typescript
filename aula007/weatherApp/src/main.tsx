import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { Search } from "./Components/Routers/Search/Search";
import { Result } from "./Components/Routers/Result/Result";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Search />} />
                <Route path="/city" element={<Result />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
