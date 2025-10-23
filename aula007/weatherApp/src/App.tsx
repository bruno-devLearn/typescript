import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Header } from "./Components/Header";
import { Outlet } from "react-router";

const queryClient = new QueryClient();

function App() {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <Header />
            <Outlet />
        </QueryClientProvider>
    );
}

export default App;
