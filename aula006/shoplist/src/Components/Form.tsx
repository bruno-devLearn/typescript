import { useState } from "react";
import { Product } from "../ts/build";

export function Form({ setList, lista }) {
    const [nome, setNome] = useState("");
    const [quant, setQuant] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const produto = new Product(nome, quant);
        setList([...lista, produto]);
        console.log(produto);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Adicionar Novo Item</h1>
            <div className="form-content">
                <input
                    type="text"
                    placeholder="Nome do Produto..."
                    className="nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="number"
                    required
                    min="1"
                    className="quantidade"
                    value={quant}
                    onChange={(e) => setQuant(Number(e.target.value))}
                />
                <button>Adicionar Item</button>
            </div>
        </form>
    );
}
