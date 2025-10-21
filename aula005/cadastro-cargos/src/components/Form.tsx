export function Form() {
    return (
        <div className="form">
            <h1>Cadastrar Novo Funcionario</h1>
            <span className="desc">
                Preencha os detalhes para adicionar um novo funcionário ao
                sistema.
            </span>
            <form>
                <h2>Nome do Funcionário</h2>
                <input type="text" placeholder="Nome completo do funcionário" />

                <h2>Cargo</h2>
                <select>
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
