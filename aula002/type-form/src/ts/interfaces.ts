export enum Genero {
    Masculino = "Masculino",
    Feminino = "Feminino",
    Outro = "Outro",
}

export interface Pessoa {
    nome: string;
    idade: number;
    genero: Genero;
    hobbies: string[];
}
