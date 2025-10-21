import deleteIcon from "../assets/lucide-Trash2-Outlined.svg";
import { useFuncionarios } from "../ts/store";

export function Table() {
    const { listaFuncionarios, updateLista } = useFuncionarios();

    return (
        <div className="table">
            <h2>Lista de Funcionários</h2>
            <table>
                <thead>
                    <tr>
                        <th>NOME</th>
                        <th>CARGO</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {listaFuncionarios.map((funcionario) => (
                        <tr key={crypto.randomUUID()}>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.cargo}</td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="delete"
                                        onClick={() => {
                                            updateLista(
                                                listaFuncionarios.filter(
                                                    (f) => f !== funcionario
                                                )
                                            );
                                        }}
                                    >
                                        <img src={deleteIcon} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
