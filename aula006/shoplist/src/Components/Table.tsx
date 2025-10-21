import deleteIcon from "../assets/lucide-Trash2-Outlined.svg";

export function Table({ setList, lista }) {
    return (
        <div className="table-div">
            <h2>Sua Lista de Compras</h2>
            {lista.length !== 0 ? (
                <div className="table-content">
                    {lista.map((item) => (
                        <div className="linha" key={item.id}>
                            <div className="checkbox">
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>
                                        {item.produto} ({item.quantidade})
                                    </span>
                                </label>
                            </div>
                            <button
                                className="delete"
                                onClick={() => {
                                    setList(lista.filter((i) => i !== item));
                                }}
                            >
                                <img src={deleteIcon} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
