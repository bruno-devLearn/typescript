import { LivroClass } from "./class";
import type { Status } from "./interfaces";

const tituloInput = document.querySelector("#titulo")!;
const autorInput = document.querySelector("#autor")!;
const paginasInput = document.querySelector("#paginas")!;
const statusInput = document.querySelector("#status")!;
const radios = document.getElementsByName(
    "status"
)! as NodeListOf<HTMLInputElement>;

function getValues(e: Event): void {
    e.preventDefault();

    const titulo = tituloInput.value;
    const autor = autorInput.value;
    const paginas = Number(paginasInput.value);
    const status = Array.from(radios).find((radio) => radio.checked)
        ?.value as Status;

    createBook(titulo, autor, paginas, status);
}

const bookList: Livro[] = [];

function createBook(
    titulo: string,
    autor: string,
    paginas: number,
    status: Status
): void {
    const book = new LivroClass(titulo, autor, paginas, status);
    bookList.push(book);

    setArticle();
}

const bookListDiv = document.querySelector("#book-list")!;

function setArticle(): void {
    const book = bookList.at(-1);

    const article = document.createElement("article");
    article.classList.add("book-card");
    article.setAttribute("role", "article");

    const h3 = document.createElement("h3");
    h3.textContent = book.titulo;

    const bookMeta = document.createElement("div");
    bookMeta.classList.add("book-meta");

    const authorSpan = document.createElement("span");
    authorSpan.classList.add("author");
    authorSpan.textContent = book.autor;

    const pagesSpan = document.createElement("span");
    pagesSpan.classList.add("pages");
    pagesSpan.textContent = book.paginas;

    const statusSpan = document.createElement("span");
    statusSpan.classList.add("badge");
    statusSpan.textContent = book.status;

    bookMeta.append(authorSpan, statusSpan, pagesSpan);

    article.append(h3, bookMeta);
    bookListDiv.appendChild(article);
}

const formTag = document.querySelector("form");
formTag?.addEventListener("submit", getValues);

function resetAll(): void {
    bookListDiv.innerHTML = "";
}

formTag?.addEventListener("reset", resetAll);
