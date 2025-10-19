# Inferência de Tipo em TypeScript

Inferência de tipos é quando o TypeScript "adivinha" o tipo de uma expressão quando você não anota explicitamente. É útil para reduzir verbosidade mantendo segurança.

---

## Como funciona (resumo)

-   Ao inicializar variáveis: o tipo é inferido a partir do valor inicial.
-   Em retorno de funções: o compilador deduz o tipo do valor retornado.
-   Em literais (arrays/objetos): o compilador calcula o melhor tipo comum.
-   Em contexto (tipagem contextual): o uso esperado pode definir o tipo de uma expressão.

---

## Exemplos práticos

### Inicialização simples

```ts
let x = 3;
// Inferido: x: number
```

### Valores padrão de parâmetros

```ts
function soma(a = 1, b = 2) {
    return a + b; // retorno inferido como number
}
```

---

## Melhor tipo comum (Best Common Type)

Quando há várias expressões, o TS escolhe um tipo que acomode todas.

```ts
let arr = [0, 1, null];
// Inferido: (number | null)[]
```

Se não houver supertipo óbvio:

```ts
class Rinoceronte {}
class Elefante {}
class Cobra {}

let zoo = [new Rinoceronte(), new Elefante(), new Cobra()];
// Inferido: (Rinoceronte | Elefante | Cobra)[]
```

Forçar um tipo comum (anotação):

```ts
let zoo: Animal[] = [new Rinoceronte(), new Elefante(), new Cobra()];
// Inferido: Animal[]
```

---

## Tipagem contextual (contextual typing)

O tipo pode ser inferido a partir do local onde a expressão é usada.

```ts
window.onmousedown = function (e) {
    console.log(e.button); // e é inferido como MouseEvent
};
```

Sem contexto, parâmetros podem virar `any`:

```ts
const handler = function (e) {
    // e: any
};
```

Você pode sobrescrever o contexto com anotação:

```ts
window.onscroll = function (e: any) {
    // e tratado como any
};
```

---

## Onde a tipagem contextual aparece

-   Argumentos de funções
-   Lado direito de atribuições
-   Literais de objeto e array
-   Declarações de retorno
-   Asserções e membros de objetos

---

## Quando anotar manualmente (dicas rápidas)

-   Anote quando a intenção não for óbvia ou o tipo inferido for muito amplo.
-   Use `as const` para transformar literais em tipos literais:

```ts
const cores = ["vermelho", "verde"] as const;
// tipo: readonly ["vermelho", "verde"]
```

-   Prefira `unknown` a `any` quando receber dados externos e faça checagens antes de usar.
-   Use anotações para deixar a API clara:

```ts
function criaZoologico(): Animal[] {
    return [new Rinoceronte(), new Elefante(), new Cobra()];
}
```

---

## Resumo prático

-   Inferência reduz anotações repetitivas sem perder tipagem.
-   Quando múltiplos valores existem, TS escolhe o melhor tipo comum.
-   Contexto pode **fornecer** tipos (tipagem contextual).
-   Anote quando for necessário para clareza ou para guiar a inferência.
