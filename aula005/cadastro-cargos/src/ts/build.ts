enum Cargo {
    gerente,
    analista,
    desenvolvedor,
    designer,
    testador,
    coordernador,
    assistente,
    supervisor,
    diretor,
    estagiario,
}

export class Funcionario {
    nome: string;
    cargo: Cargo;

    constructor(nome: string, cargo: Cargo) {
        this.nome = nome;
        this.cargo = cargo;
    }
}
