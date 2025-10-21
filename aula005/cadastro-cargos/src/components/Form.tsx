import { useState } from "react";
import { Funcionario } from "../ts/build";
import { useFuncionarios } from "../ts/store";

export function Form() {
    const { listaFuncionarios, updateLista } = useFuncionarios();

    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("gerente");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const funcionario = new Funcionario(nome, cargo);
        updateLista([...listaFuncionarios, funcionario]);
    };

    return (
        <div className="form" onSubmit={handleSubmit}>
            <h1>Cadastrar Novo Funcionario</h1>
            <span className="desc">
                Preencha os detalhes para adicionar um novo funcionário ao
                sistema.
            </span>
            <form>
                <h2>Nome do Funcionário</h2>
                <input
                    type="text"
                    placeholder="Nome completo do funcionário"
                    value={nome}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNome(e.target.value)
                    }
                />

                <h2>Cargo</h2>
                <select
                    value={cargo}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCargo(e.target.value)
                    }
                >
                    <option value="gerente">Gerente</option>
                    <option value="analista">Analista</option>
                    <option value="desenvolvedor">Desenvolvedor</option>
                    <option value="designer">Designer</option>
                    <option value="testador">Testador</option>
                    <option value="coordenador">Coordenador</option>
                    <option value="assistente">Assistente</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="diretor">Diretor</option>
                    <option value="estagiario">Estagiario</option>
                </select>
                <button>Adicionar Funcionário</button>
            </form>
        </div>
    );
}
