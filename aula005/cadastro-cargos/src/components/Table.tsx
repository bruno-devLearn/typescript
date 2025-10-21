import editIcon from "../assets/lucide-Pencil-Outlined.svg";
import deleteIcon from "../assets/lucide-Trash2-Outlined.svg";

export function Table() {
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
                    <tr>
                        <td>Ana Silva</td>
                        <td>Desenvolvedor</td>
                        <td>
                            <div className="actions">
                                <button className="edit">
                                    <img src={editIcon} />
                                </button>
                                <button className="delete">
                                    <img src={deleteIcon} />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
