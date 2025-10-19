import type { Pessoa } from "./interfaces";
import { pessoaClass } from "./pessoa";

const inputNome = document.querySelector<HTMLInputElement>("#nome")!;
const inputIdade = document.querySelector<HTMLInputElement>("#idade")!;
const inputHobies = document.querySelector<HTMLInputElement>("#hobbies")!;
const select = document.querySelector<HTMLSelectElement>("#genero")!;

const addBtn = document.querySelector<HTMLButtonElement>("#adicionar")!;
const list: Pessoa[] = [];

function AddPeople(): void {
    const hobbies: string[] = inputHobies.value.split(",").map((h) => h.trim());

    const pessoa = new pessoaClass(
        inputNome.value,
        Number(inputIdade.value),
        select.value,
        hobbies
    );

    list.push(pessoa);
}

const listaDiv: HTMLDivElement = document.querySelector("#lista");
const menssageP: HTMLParagraphElement | null =
    document.querySelector("#lista-vazia");

function updateEmptyMessage(): void {
    if (!menssageP) return;
    menssageP.style.display = list.length > 0 ? "none" : "block";
}

function setDOM(): void {
    AddPeople();

    // atualiza visibilidade da mensagem (usa helper)
    updateEmptyMessage();

    // pega a última pessoa adicionada
    const item = list.at(-1);
    if (!item) return;

    // cria elementos
    const article = document.createElement("article");
    article.classList.add("pessoa");

    const nome = document.createElement("h3");
    nome.classList.add("pessoa-nome");
    nome.textContent = item.nome;

    const idade = document.createElement("p");
    idade.classList.add("pessoa-idade");
    idade.textContent = `Idade: ${item.idade}`;

    const genero = document.createElement("p");
    genero.classList.add("pessoa-genero");
    genero.textContent = `Gênero: ${item.genero}`;

    const hobbies = document.createElement("ul");
    hobbies.classList.add("pessoa-hobbies");

    item.hobbies.forEach((hobby) => {
        const li = document.createElement("li");
        li.textContent = hobby;
        hobbies.appendChild(li);
    });

    const remover = document.createElement("button");
    remover.classList.add("remover");
    remover.textContent = "Remover";
    remover.addEventListener("click", () => {
        remove(item, article);
    });

    // monta o artigo
    article.append(nome, idade, genero, hobbies, remover);
    listaDiv.appendChild(article);
}

function remove(item: Pessoa, article: HTMLElement): void {
    // remove do array
    const index = list.indexOf(item);
    if (index > -1) list.splice(index, 1);

    // remove do DOM
    article.remove();
    // atualiza visibilidade da mensagem após remoção
    updateEmptyMessage();
}

addBtn.addEventListener("click", setDOM);
