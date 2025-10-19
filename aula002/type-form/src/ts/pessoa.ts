import type { Pessoa } from "./interfaces";
import { Genero } from "./interfaces.ts";

export class pessoaClass implements Pessoa {
    nome: string;
    idade: number;
    genero: Genero;
    hobbies: string[];

    constructor(
        nome: string,
        idade: number,
        genero: Genero,
        hobbies: string[]
    ) {
        this.nome = nome;
        this.idade = idade;
        this.genero = genero;
        this.hobbies = hobbies;
    }
}
