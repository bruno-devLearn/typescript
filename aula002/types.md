# Typescript types

Atualmente temos alguns tipos de variáveis em TypeScript. Entre elas estão: **primitive**, **object**, **top** e **bottom**.

---

## Primitive types

Os tipos **primitivos** são os mais básicos da linguagem. Eles representam valores simples e imutáveis.

Existem 6 tipos primitivos em TypeScript:

### 🔹 boolean

Representa valores lógicos: `true` ou `false`.

```ts
let ativo: boolean = true;
let verificado: boolean = false;
```

---

### 🔹 number

Representa números, podendo ser inteiros ou decimais.

```ts
let idade: number = 17;
let altura: number = 1.75;
```

---

### 🔹 string

Representa textos (sequência de caracteres).

```ts
let nome: string = "Bruno";
let frase: string = `Olá, ${nome}!`;
```

---

### 🔹 void

Usado em **funções que não retornam valor**.

```ts
function logar(): void {
    console.log("Executando...");
}
```

---

### 🔹 undefined

Indica que uma variável **foi declarada, mas não recebeu valor**.

```ts
let valor: undefined;
console.log(valor); // undefined
```

---

### 🔹 null

Representa a **ausência intencional** de um valor.

```ts
let resposta: null = null;
```

---

## Object types

Os **object types** representam estruturas mais complexas, formadas por múltiplos valores agrupados.  
Eles são fundamentais no TypeScript, pois permitem criar **estruturas organizadas** e **tipadas** para os dados.

---

### 🔹 Object

É o tipo base para qualquer valor que **não seja primitivo**.  
Pode ser usado de forma genérica ou com estrutura definida.

```ts
let usuario: { nome: string; idade: number } = {
    nome: "Bruno",
    idade: 17,
};
```

O TypeScript exige que o objeto tenha **todas as propriedades obrigatórias** e com os **tipos corretos**.

```ts
usuario.nome = "Bruno Dev";
usuario.idade = 18;
```

---

### 🔹 Interface

Uma **interface** define a **forma (shape)** de um objeto.  
É muito usada para garantir consistência entre diferentes partes do código.

```ts
interface Pessoa {
    nome: string;
    idade: number;
    ativo?: boolean; // propriedade opcional
}

const p1: Pessoa = { nome: "Bruno", idade: 17 };
```

As interfaces também podem ser **estendidas**:

```ts
interface Aluno extends Pessoa {
    matricula: string;
}

const aluno: Aluno = { nome: "Bruno", idade: 17, matricula: "2025A" };
```

---

### 🔹 Class

Classes são **modelos** para criar objetos com propriedades e métodos.  
Em TypeScript, podemos **tipar** tudo dentro da classe.

```ts
class Pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar(): string {
        return `Olá, eu sou ${this.nome} e tenho ${this.idade} anos.`;
    }
}

const p = new Pessoa("Bruno", 17);
console.log(p.apresentar());
```

---

### 🔹 Enum

Enums são usados para representar **conjuntos de valores nomeados**.  
Facilitam a leitura e reduzem erros de digitação.

```ts
enum Cor {
    Vermelho,
    Verde,
    Azul,
}

let c: Cor = Cor.Vermelho;
console.log(c); // 0
```

Também é possível definir **valores personalizados**:

```ts
enum Status {
    Sucesso = "OK",
    Erro = "FAIL",
}

let s: Status = Status.Sucesso;
```

---

### 🔹 Array

Arrays armazenam **listas de valores do mesmo tipo**.

```ts
let numeros: number[] = [1, 2, 3];
let nomes: Array<string> = ["Bruno", "João", "Maria"];
```

É possível criar arrays de objetos:

```ts
let pessoas: Pessoa[] = [
    { nome: "Bruno", idade: 17 },
    { nome: "João", idade: 18 },
];
```

---

### 🔹 Tuple

Tuplas são **arrays com tamanho e tipos fixos**.  
Cada posição tem um tipo específico.

```ts
let usuario: [string, number] = ["Bruno", 17];
```

Também é possível nomear os elementos (a partir do TS 4.0):

```ts
let pessoa: [nome: string, idade: number] = ["Bruno", 17];
```

## Top Types

Os **Top Types** são os tipos mais genéricos do TypeScript.  
Eles ficam no **topo da hierarquia de tipos**, ou seja, **qualquer valor pode ser atribuído a eles**.  
Os principais top types são: **`unknown`** e **`any`**.

---

### 🔹 any

-   Aceita **qualquer tipo de valor**.
-   **Desativa a verificação de tipos**, permitindo qualquer operação.
-   É o mais **permissivo**, mas **menos seguro**.

```ts
let valor: any;

valor = 10;
valor = "texto";
valor = true;
valor = { nome: "Bruno" };

// Operações perigosas sem erro
console.log(valor.toUpperCase()); // ❌ Pode causar erro em runtime
```

> ⚠️ Use `any` somente quando for realmente necessário, pois **perde a segurança do TypeScript**.

---

### 🔹 unknown

-   Também aceita **qualquer valor**.
-   Mas **exige verificação de tipo antes de usar**.
-   É **mais seguro** que `any`.

```ts
let dado: unknown;

dado = 10;
dado = "texto";

if (typeof dado === "string") {
    console.log(dado.toUpperCase()); // ✅ Seguro
}

if (typeof dado === "number") {
    console.log(dado + 10); // ✅ Seguro
}
```

> `unknown` é ideal para receber dados de APIs ou valores **não confiáveis**, forçando checagem de tipos antes do uso.

---

### 🔹 Resumo rápido

| Tipo      | Aceita qualquer valor? | Segurança                                  |
| --------- | ---------------------- | ------------------------------------------ |
| `any`     | ✅                     | ❌ Perde checagem de tipos                 |
| `unknown` | ✅                     | ✅ Seguro: exige verificação antes de usar |

---

💡 **Dica:**  
Prefira sempre `unknown` a `any`, pois mantém a **segurança de tipos**, mesmo quando você não sabe qual será o valor.

## Bottom Types

Os **Bottom Types** são tipos que **nunca têm valor**.  
Eles representam casos em que **nada pode existir** e ficam na **base da hierarquia de tipos**.  
O principal bottom type no TypeScript é: **`never`**.

---

### 🔹 never

O tipo `never` é usado para funções ou expressões que **nunca retornam um valor**.  
Exemplos típicos:

1. Funções que **sempre lançam erro**:

```ts
function erro(msg: string): never {
    throw new Error(msg);
}
```

2. Funções com **loops infinitos**:

```ts
function loopInfinito(): never {
    while (true) {
        console.log("Executando...");
    }
}
```

3. Situações **impossíveis** no código:

```ts
function verificarValor(x: string | number) {
    if (typeof x === "string") {
        console.log("É string");
    } else if (typeof x === "number") {
        console.log("É number");
    } else {
        // Nunca deve chegar aqui
        const impossivel: never = x;
    }
}
```

---

### 🔹 Por que usar `never`?

-   Indica **claramente** que uma função **não retorna**.
-   Ajuda o TypeScript a **detectar erros de lógica**, por exemplo, quando você acha que já cobriu todos os casos, mas algo "impossível" aparece.
-   É o **oposto do top type**, porque **nenhum valor pode ser atribuído** a `never`.

---

### 🔹 Resumo rápido

| Tipo    | Possui valor? | Uso principal                                                  |
| ------- | ------------- | -------------------------------------------------------------- |
| `never` | ❌ Nenhum     | Funções que nunca retornam, loops infinitos, casos impossíveis |

---

💡 **Dica:**  
Sempre que uma função **lança erro ou entra em loop infinito**, use `never` como tipo de retorno.  
Isso ajuda o TypeScript a entender **que aquele caminho do código não retorna**.

## TypeScript Assertions

Em TypeScript, **assertions** são formas de dizer ao compilador "confia em mim, eu sei o tipo disso".  
Isso **não muda o valor em runtime**, apenas informa o tipo para o compilador.

---

### 🔹 `as [type]`

-   Converte uma variável para um **tipo específico**.
-   Útil quando o TypeScript **não consegue inferir o tipo corretamente**.

```ts
let valor: unknown = "Bruno";

// Assert que é string
let nome: string = valor as string;

console.log(nome.toUpperCase()); // ✅ Seguro
```

---

### 🔹 `as any`

-   Converte qualquer valor para `any`, **desativando a checagem de tipos**.
-   Deve ser usado **com cuidado**, pois perde a segurança do TypeScript.

```ts
let valor: unknown = 123;
let x = valor as any;

console.log(x.toUpperCase()); // ❌ Pode causar erro em runtime, mas TS não reclama
```

---

### 🔹 `as const`

-   Transforma **literal values** em **tipos literais**.
-   Útil para **fixar valores imutáveis**.

```ts
let cores = ["vermelho", "verde"] as const;

// O tipo agora é readonly ["vermelho", "verde"]
// Não é possível alterar nem o array nem os valores
```

---

## Non-null Assertions (`!`)

-   Indica que uma variável **não é `null` nem `undefined`**.
-   Útil quando o TypeScript não consegue inferir que algo está garantido.

```ts
let input: HTMLInputElement | null = document.querySelector("input");

// Afirmamos que input não é null
input!.value = "Teste";
```

> ⚠️ Use com cuidado — se estiver errado, vai gerar **erro em runtime**.

---

## `satisfies` keyword

-   Introduzido no TS 4.9.
-   Verifica que um **valor satisfaz um tipo** sem mudar o tipo real da variável.
-   Diferente de `as`, **não faz type assertion**, só valida.

```ts
interface Pessoa {
    nome: string;
    idade: number;
}

const p = {
    nome: "Bruno",
    idade: 17,
    ativo: true,
} satisfies Pessoa;

// TS garante que p possui nome e idade, mas mantém "ativo" também
```

-   Muito útil para **garantir conformidade com tipos** sem perder propriedades extras.
