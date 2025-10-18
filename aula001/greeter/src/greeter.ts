class p {
    fullName: String;
    constructor(public nome: String, public sobrenome: String) {
        this.fullName = this.nome + " " + this.sobrenome;
    }
}

interface Person {
    nome: String;
    sobrenome: String;
}

function greeter(person: Person) {
    return `Olá ${person.nome} ${person.sobrenome}`;
}

const pessoa = new p("Bruno", "Queiroz");
document.body.textContent = greeter(pessoa);
