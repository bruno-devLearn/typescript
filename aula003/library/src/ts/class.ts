import type { Status, Livro } from "./interfaces";

export class LivroClass implements Livro {
    titulo: string;
    autor: string;
    paginas: number;
    status: Status;

    constructor(
        titulo: string,
        autor: string,
        paginas: number,
        status: Status
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
        this.status = status;
    }
}
