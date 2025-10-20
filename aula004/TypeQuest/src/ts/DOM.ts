import type { Personagem } from "./interfaces";
import { PersonagemClass } from "./classe";

const inputNome = document.querySelector("#nome")!;
const inputVida = document.querySelector("#vida")!;
const select = document.querySelector("#classe")!;

function getValues(e) {
    e.preventDefault();
    const personagem = new PersonagemClass(inputNome.value, select.value);

    buildCard(personagem);
}

const ul = document.querySelector("#listaPersonagens")!;

function buildCard(personagem: Personagem) {
    const li = document.createElement("li");
    li.classList.add("personagem", personagem.classe);

    const header = document.createElement("div");
    header.classList.add("personagem-header");

    const spanNome = document.createElement("span");
    spanNome.classList.add("nome");
    spanNome.textContent = personagem.nome;

    const spanClasse = document.createElement("span");
    spanClasse.classList.add("badge", "classe");
    spanClasse.textContent = personagem.classe;

    const btn = document.createElement("button");
    btn.classList.add("btn-excluir");
    btn.textContent = "x";
    btn.addEventListener("click", () => deletarPersonagem(li));

    header.append(spanNome, spanClasse, btn);

    const body = document.createElement("div");
    body.classList.add("personagem-body");

    const vida = document.createElement("small");
    vida.classList.add("vida");
    vida.textContent = "Vida: " + personagem.vida;

    const habilidade = document.createElement("small");
    habilidade.classList.add("habilidade");
    habilidade.textContent = "Habilidade: " + personagem.habilidade;

    const poder = document.createElement("small");
    poder.classList.add("poder");
    poder.textContent = "Poder: " + personagem.poder;

    body.append(vida, habilidade, poder);
    li.append(header, body);
    ul.appendChild(li);
}

function deletarPersonagem(elemento: HTMLLIElement) {
    elemento.remove();
}

const form = document.querySelector("#personagemForm")!;
form.addEventListener("submit", getValues);
