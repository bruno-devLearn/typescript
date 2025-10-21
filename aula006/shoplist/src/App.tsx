import { useState } from "react";
import "./App.css";
import { Form } from "./Components/Form";
import { Table } from "./Components/Table";

function App() {
    const [lista, setList] = useState<Product[]>([]);

    return (
        <main>
            <Form setList={setList} lista={lista} />
            <Table setList={setList} lista={lista} />
        </main>
    );
}

export default App;
