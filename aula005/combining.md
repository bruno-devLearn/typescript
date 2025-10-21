# Combining Types — TypeScript

## O que são "Combining types"

Combining types são formas de compor tipos existentes para formar novos tipos. Combinam propriedades/valores de outros tipos para expressar relações mais complexas sem repetir código.

---

## Union Types (A | B)

-   Representam valores que podem ser de um tipo OU de outro.
-   Sintaxe: `type T = A | B`.

Exemplo:

```ts
type ID = string | number;

function printId(id: ID) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(0));
    }
}
```

Dicas:

-   Faça _narrowing_ (typeof, instanceof, Array.isArray, in, type guards) antes de usar propriedades específicas.
-   Propriedades acessíveis sem narrowing devem existir em todos os membros do union.

---

## Intersection Types (A & B)

-   Representam valores que devem satisfazer A E B ao mesmo tempo.
-   Útil para mesclar propriedades ou mixins.
-   Sintaxe: `type T = A & B`.

Exemplo:

```ts
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const p: Person = { name: "Ana", age: 30 };
```

Observações:

-   Interseções de tipos incompatíveis (por exemplo, `string & number`) resultam em `never`.
-   Boa para compor comportamentos, mas cuidado com colisões de nomes/propriedades.

---

## Type Aliases (`type`)

-   Permitem dar nome a tipos (primitivos, unions, intersections, genéricos).
-   Sintaxe: `type Alias = ...`.

Exemplos:

```ts
type Callback = (err: Error | null, result?: string) => void;
type WithId<T> = T & { id: string | number };
```

Diferença para `interface`:

-   `type` é mais flexível (unions, tuples, mapped types).
-   `interface` permite declaração aberta/merge em algumas situações.

---

## keyof Operator

-   `keyof T` produz uma união das chaves públicas de `T` como literais (`"a" | "b"`).
-   Utilizado em genéricos para acessar propriedades com segurança.

Exemplo:

```ts
type Person = { name: string; age: number };
type Keys = keyof Person; // "name" | "age"

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person: Person = { name: "João", age: 25 };
const nome = getProp(person, "name"); // inferred string
```

Notas:

-   `keyof` inclui também `number`/`symbol` chaves quando aplicável.
-   Combinado com index access types (`T[K]`) permite criar APIs tipadas e seguras.

---

## Exemplos combinando tudo

```ts
type A = { x: number; common: string };
type B = { y: string; common: string };

type U = A | B; // union
type I = A & B; // intersection (tem x, y, common)

type AnyWithId = WithId<U | I>; // aliases + union/intersection

function get<T, K extends keyof T>(o: T, k: K): T[K] {
    return o[k];
}
```

---

## Boas práticas rápidas

-   Use unions para representar alternativas e interseções para combinar requisitos.
-   Nomeie combinações com `type` para clareza e reuso.
-   Sempre faça narrowing antes de acessar membros específicos de uma union.
-   Prefira composições pequenas e claras em vez de tipos enormes e complexos.

---
