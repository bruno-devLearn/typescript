import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            {/* Compoents */}
        </QueryClientProvider>
    );
}

export default App;
