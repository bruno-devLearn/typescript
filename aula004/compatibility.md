# Compatibilidade de Tipos

Compatibilidade de tipos no TypeScript é baseada em tipagem estrutural: dois tipos são compatíveis quando suas estruturas (membros) batem, independentemente do nome ou declaração explícita.

---

## Visão geral rápida

-   Tipo estrutural: compatibilidade determinada pelos membros presentes.
-   Regra básica: x é compatível com y se y tiver ao menos os membros de x com tipos compatíveis.
-   TypeScript não é totalmente "sólido" (sound) — algumas permissões perigosas são intencionais para suportar padrões JS.

---

## Objetos e interfaces

-   Apenas os membros do tipo alvo são checados. Propriedades extras no objeto fonte são permitidas.

```ts
interface Nomeado {
    nome: string;
}
class Pessoa {
    nome: string;
}
let p: Nomeado;
p = new Pessoa(); // OK — tipagem estrutural

let x: Nomeado;
let y = { nome: "Alice", localizacao: "Acre" };
x = y; // OK — y tem pelo menos 'nome'
```

---

## Funções

-   Parâmetros: nomes não importam, apenas tipos e posições.
-   Permite atribuir função com menos parâmetros a uma que espera mais (parâmetros "descartáveis").

```ts
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK
x = y; // Erro — y requer mais parâmetros
```

-   Retornos: o tipo retornado da fonte deve ser subtipo do tipo retornado do alvo.

```ts
let a = () => ({ nome: "Alice" });
let b = () => ({ nome: "Alice", localizacao: "Acre" });
a = b; // OK
b = a; // Erro — falta 'localizacao'
```

---

## Parâmetros bivariados (pragmático, não sólido)

Por padrão os parâmetros podem ser comparados bidirecionalmente (source <= target ou vice-versa), o que facilita padrões comuns, mas pode ser inseguro. O `strictFunctionTypes` do compilador torna essa checagem contravarianted somente.

Exemplo comum com eventos:

```ts
enum EventType {
    Mouse,
    Keyboard,
}
interface Event {
    timestamp: number;
}
interface MouseEvent extends Event {
    x: number;
    y: number;
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}

// Útil, embora não sólido
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));
```

---

## Parâmetros opcionais e rest

-   Parâmetros opcionais são intercambiáveis com requeridos quando compatíveis.
-   Parâmetros rest são tratados como infinitos opcionais — útil para callbacks variádicos.

```ts
function chamaDepois(args: any[], callback: (...args: any[]) => void) {
    /* ... */
}
chamaDepois([1, 2], (x, y) => console.log(x + ", " + y)); // permitido
```

---

## Sobrecargas de função

Cada sobrecarga do tipo fonte deve ser compatível com alguma assinatura do tipo alvo, garantindo que chamadas esperadas ainda funcionem.

---

## Enums

-   Enums são compatíveis com `number`.
-   Valores de enums diferentes entre si são incompatíveis.

```ts
enum Status {
    Pronto,
    Esperando,
}
enum Cor {
    Vermelho,
    Azul,
    Verde,
}

let status = Status.Pronto;
status = Cor.Verde; // Erro
```

---

## Classes

-   Compatibilidade baseada em membros de instância; estáticos e construtores não importam.
-   Exceção: membros `private`/`protected` só são compatíveis se vierem da mesma classe de origem hierárquica.

```ts
class Animal {
    patas: number;
    constructor(nome: string, numPatas: number) {}
}
class Tamanho {
    patas: number;
    constructor(numPatas: number) {}
}
let a: Animal;
let s: Tamanho;
a = s; // OK
s = a; // OK
```

---

## Generics

-   Quando o tipo genérico não usa o parâmetro de tipo na estrutura, instâncias com argumentos diferentes podem ser compatíveis.

```ts
interface Empty<T> {}
let x: Empty<number>;
let y: Empty<string>;
x = y; // OK

interface NaoVazio<T> {
    data: T;
}
let a: NaoVazio<number>;
let b: NaoVazio<string>;
a = b; // Erro — 'data' difere
```

-   Genéricos não especificados são comparados como `any` nos parâmetros genéricos durante a checagem.

---

## Subtipos vs Atribuições

TypeScript usa dois mecanismos de compatibilidade: subtipagem e compatibilidade por atribuição. Na prática, a compatibilidade por atribuição é a regra aplicada na maioria dos locais (incluindo `implements` e `extends`).

---

## Nota sobre solidez (soundness)

Algumas regras do TypeScript relaxam a segurança estrita para acomodar padrões JavaScript amplamente usados (callbacks com argumentos extras, funções variádicas, etc.). Essas decisões foram tomadas visando praticidade; o compilador oferece flags (ex.: `strictFunctionTypes`) para tornar alguns desses comportamentos mais restritos.

---

Resumo rápido

-   Tipagem estrutural: compatibilidade baseada na forma.
-   Funções: parâmetros descartáveis permitidos; retornos exigem subtipagem.
-   Classes: instância é comparada; privados/protegidos exigem mesma origem.
-   Generics: compatibilidade depende do uso do parâmetro de tipo.
-   TypeScript prioriza praticidade sobre solidez absoluta em alguns casos.
