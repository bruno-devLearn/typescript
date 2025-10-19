export enum Status {
    Lido = "lido",
    NaoLido = "nao lido",
}

export interface Livro {
    titulo: string;
    autor: string;
    paginas: number;
    status: Status;
}
