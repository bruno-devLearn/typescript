import type { Personagem } from "./interfaces";
import { ValoresPersonagem } from "./interfaces";

export class PersonagemClass implements Personagem {
    nome: string;
    vida: string;
    classe: string;
    habilidade: string;
    poder: string | number;

    constructor(nome: string, classe: keyof typeof ValoresPersonagem) {
        this.nome = nome;
        this.classe = classe;
        this.vida = ValoresPersonagem[classe].vida;
        this.habilidade = ValoresPersonagem[classe].habilidade;
        this.poder = ValoresPersonagem[classe].poder;
    }
}
