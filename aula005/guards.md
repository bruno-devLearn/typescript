# Type Guards / Narrowing — Aula de TypeScript

Type Guards (ou narrowing) são técnicas que permitem ao compilador do TypeScript reduzir (narrow) um tipo composto para um subtipo mais específico, habilitando acesso a propriedades e métodos seguros em tempo de compilação.

## typeof

Usado para tipos primitivos (string, number, boolean, symbol, undefined, bigint, function).

Exemplos:

```ts
function exemplo(x: string | number) {
    if (typeof x === "string") {
        // x é string aqui
        console.log(x.toUpperCase());
    } else {
        // x é number aqui
        console.log(x.toFixed(2));
    }
}
```

Dica: typeof é seguro apenas para primitivas (não para objetos customizados).

---

## instanceof

Usado para verificar protótipos de objetos (classes e construtores).

Exemplos:

```ts
class Animal {
    speak() {}
}
class Dog extends Animal {
    bark() {}
}

function handle(a: Animal) {
    if (a instanceof Dog) {
        a.bark(); // narrow para Dog
    } else {
        a.speak(); // ainda Animal
    }
}
```

Observação: funciona com classes/constructores reais em tempo de execução; não funciona com tipos de interface (só em tempo de compilação).

---

## Equality (comparação)

Comparações com `===` ou `!==` podem estreitar uniões literais e valores discriminados.

Exemplo com literais:

```ts
function move(dir: "left" | "right" | "up" | "down") {
    if (dir === "left" || dir === "right") {
        // narrow para "left" | "right"
    }
}
```

Exemplo com discriminated unions:

```ts
type A = { kind: "a"; a: string };
type B = { kind: "b"; b: number };
type U = A | B;

function f(x: U) {
    if (x.kind === "a") {
        // x é A
        console.log(x.a);
    } else {
        // x é B
        console.log(x.b);
    }
}
```

---

## Truthiness

Checagens simples (if, !!, !== null) podem eliminar null/undefined e estreitar tipos opcionais.

Exemplos:

```ts
function greet(name?: string | null) {
    if (name) {
        // name é string (não null/undefined/""/0)
        console.log("Olá, " + name.toUpperCase());
    } else {
        console.log("Olá, convidado");
    }
}
```

Cuidado: checagem de truthiness também elimina valores falsy como `""`, `0`, `false`. Use `name != null` para apenas remover null/undefined:

```ts
if (name != null) {
    /* name é string */
}
```

---

## Type Predicates (predicados de tipo)

Funções que retornam um booleano e declaram um `param is Type` permitem criar guards reutilizáveis.

Exemplo básico:

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function handlePet(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim(); // narrow para Fish
    } else {
        pet.fly(); // narrow para Bird
    }
}
```

Predicados podem usar qualquer lógica e permitem composições complexas (checagens de propriedade, `in`, `typeof`, etc.).

---

## Boas práticas e dicas

-   Prefira discriminated unions (propriedade `kind` literal) quando possível.
-   Use `typeof` para primitvos; `instanceof` para classes.
-   Use `in` para checar existência de propriedade em objetos:
    ```ts
    if ("swim" in obj) {
        /* obj pode ser Fish */
    }
    ```
-   Para checagens de null/undefined, prefira `!= null`.
-   Padronize e reutilize predicados de tipo para lógica complexa e testes.

---

Resumo rápido:

-   typeof → primitivos
-   instanceof → classes/constructores
-   equality → literais / discriminators
-   truthiness → elimina null/undefined (e outros falsy)
-   type predicates → guards customizados e reutilizáveis

Fim.
