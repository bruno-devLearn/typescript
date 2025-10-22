# TypeScript – Generics

Generics permitem criar **componentes reutilizáveis e flexíveis**, que funcionam com diferentes tipos de dados sem perder o _type safety_ (segurança de tipos).  
Em vez de definir explicitamente os tipos que uma função, classe ou interface aceita, usamos **parâmetros de tipo** (`<T>`, `<U>`, etc.) que são inferidos ou passados ao usar o código.

---

## 🧩 Generic Types

Um **Generic Type** é um tipo parametrizado.  
A ideia é criar uma estrutura que funcione para _qualquer tipo_, mas mantenha as verificações de tipo em tempo de compilação.

### 🔹 Exemplo básico:

```ts
function identity<T>(value: T): T {
    return value;
}

let num = identity(10); // T = number
let str = identity("texto"); // T = string
```

-   `T` é um **parâmetro de tipo genérico**.
-   Ele é inferido automaticamente com base no argumento.
-   O retorno tem o mesmo tipo de entrada.

### 🔹 Explicitando o tipo manualmente:

```ts
let valor = identity<number>(100);
```

---

### 🔹 Generics em Arrays

```ts
function primeiroElemento<T>(arr: T[]): T {
    return arr[0];
}

const numeros = primeiroElemento([10, 20, 30]); // T = number
const textos = primeiroElemento(["a", "b", "c"]); // T = string
```

---

### 🔹 Generics em Interfaces

```ts
interface Caixa<T> {
    conteudo: T;
}

const caixa1: Caixa<string> = { conteudo: "mensagem" };
const caixa2: Caixa<number> = { conteudo: 42 };
```

Isso é útil para estruturas de dados genéricas (listas, pilhas, filas, etc.).

---

### 🔹 Generics em Classes

```ts
class Armazem<T> {
    private valor: T;

    constructor(valor: T) {
        this.valor = valor;
    }

    getValor(): T {
        return this.valor;
    }
}

const numero = new Armazem<number>(123);
const texto = new Armazem<string>("armazenado");
```

---

### 🔹 Generics em Tipos

```ts
type Par<T, U> = {
    primeiro: T;
    segundo: U;
};

const coordenadas: Par<number, number> = { primeiro: 10, segundo: 20 };
const usuario: Par<string, number> = { primeiro: "Bruno", segundo: 17 };
```

---

## 🔒 Generic Constraints

Às vezes, queremos limitar o que um tipo genérico pode ser.  
Usamos o **`extends`** para impor restrições — o parâmetro genérico precisa **herdar ou ser compatível** com outro tipo.

---

### 🔹 Exemplo básico de constraint

```ts
function mostrarComprimento<T extends { length: number }>(item: T): number {
    return item.length;
}

mostrarComprimento("texto"); // OK (string tem length)
mostrarComprimento([1, 2, 3]); // OK (array tem length)
// mostrarComprimento(10); ❌ ERRO (number não tem length)
```

Aqui o tipo `T` **precisa ter uma propriedade `length`**, ou o TS acusa erro.

---

### 🔹 Constraint com Interfaces

```ts
interface Identificavel {
    id: number;
}

function buscarPorId<T extends Identificavel>(
    lista: T[],
    id: number
): T | undefined {
    return lista.find((item) => item.id === id);
}

const usuarios = [
    { id: 1, nome: "Bruno" },
    { id: 2, nome: "Ana" },
];
const resultado = buscarPorId(usuarios, 2);
```

-   O tipo `T` é genérico, mas limitado a objetos que tenham `id: number`.
-   Assim, o TS garante que `item.id` existe.

---

### 🔹 Múltiplos parâmetros genéricos

```ts
function combinar<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const combinado = combinar({ nome: "Bruno" }, { idade: 17 });
// combinado: { nome: string; idade: number }
```

---

### 🔹 Constraint com tipos de chave

```ts
function pegarPropriedade<T, K extends keyof T>(obj: T, chave: K) {
    return obj[chave];
}

const pessoa = { nome: "Bruno", idade: 17 };

const nome = pegarPropriedade(pessoa, "nome"); // OK
// const erro = pegarPropriedade(pessoa, "altura"); ❌ ERRO
```

-   `K extends keyof T` garante que a chave passada exista em `T`.

---

## 🧠 Resumo

| Conceito                     | Explicação                                                                  |
| ---------------------------- | --------------------------------------------------------------------------- |
| **Generic Type**             | Permite criar funções, classes e interfaces que funcionam com qualquer tipo |
| **Parâmetro Genérico `<T>`** | Um placeholder para o tipo que será definido no uso                         |
| **Inferência de Tipo**       | O TS tenta deduzir o tipo automaticamente                                   |
| **Constraint (`extends`)**   | Limita os tipos aceitos pelo genérico                                       |
| **keyof**                    | Garante que o parâmetro seja uma chave válida de um objeto                  |
| **Reutilização e segurança** | Generics aumentam a flexibilidade sem perder checagem de tipo               |

---

## ✅ Boas práticas

1. Nomeie os parâmetros genéricos de forma clara (`<T>`, `<U>`, `<K>`, `<V>`, etc.).
2. Use constraints sempre que precisar garantir que um tipo tem certas propriedades.
3. Prefira **inferência automática** sempre que possível.
4. Use generics para **funções utilitárias** ou **componentes reusáveis**, não para tudo.

---

## 🧩 Exemplo final integrando tudo

```ts
interface Item {
    id: number;
    nome: string;
}

class Repositorio<T extends Item> {
    private itens: T[] = [];

    adicionar(item: T): void {
        this.itens.push(item);
    }

    buscar(id: number): T | undefined {
        return this.itens.find((i) => i.id === id);
    }
}

const repo = new Repositorio<{ id: number; nome: string }>();
repo.adicionar({ id: 1, nome: "Arroz" });
repo.adicionar({ id: 2, nome: "Feijão" });

console.log(repo.buscar(2)); // { id: 2, nome: "Feijão" }
```

---

## 🧭 Conclusão

Generics são fundamentais no TypeScript para criar **código reusável e seguro**, sem abrir mão da inferência de tipo.  
Eles aparecem em quase todas as APIs modernas — como React, Angular, e bibliotecas de dados —, então dominar esse conceito é essencial.
