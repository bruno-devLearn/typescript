# Funções em TypeScript: Typing e Overloading

## 1. Tipagem de funções (Typing Functions)

No TypeScript, funções podem ter tipos definidos para **parâmetros** e **retorno**, garantindo segurança de tipos e ajudando na autocompletação da IDE.

### 1.1 Tipando parâmetros

Definir o tipo de cada parâmetro ajuda a evitar erros de uso.

```ts
function soma(a: number, b: number): number {
    return a + b;
}
```

**Explicação:** `a` e `b` devem ser números; o retorno também é número.

### 1.2 Parâmetros opcionais

Parâmetros podem ser opcionais usando `?`.

```ts
function saudacao(nome?: string): string {
    return nome ? `Oi, ${nome}` : "Oi!";
}
```

**Explicação:** `nome` pode ser `undefined`; a função se ajusta dependendo se ele foi passado.

### 1.3 Parâmetros padrão

Você pode definir um valor padrão caso o parâmetro não seja passado.

```ts
function multiplicar(a: number, b: number = 2): number {
    return a * b;
}
```

**Explicação:** Se `b` não for informado, assume `2`.

### 1.4 Arrow functions

Funções anônimas podem ser tipadas do mesmo jeito.

```ts
const dividir = (x: number, y: number): number => x / y;
```

**Explicação:** `x` e `y` são números; retorno também é número.

### 1.5 Funções como tipos

Você pode declarar o tipo de uma função antes de definir.

```ts
let operacao: (a: number, b: number) => number;
operacao = (x, y) => x + y;
```

**Explicação:** Garante que qualquer função atribuída tenha a mesma assinatura.

### 1.6 Retorno void

Funções que não retornam valor usam `void`.

```ts
function log(msg: string): void {
    console.log(msg);
}
```

**Explicação:** A função só realiza ação, não retorna nada.

### 1.7 Retorno never

Funções que **nunca retornam** ou sempre lançam erro usam `never`.

```ts
function erro(mensagem: string): never {
    throw new Error(mensagem);
}
```

**Explicação:** Útil para funções que sempre lançam exceção.

---

## 2. Sobrecarga de funções (Function Overloading)

Permite que uma função aceite diferentes tipos de parâmetros e retorne tipos diferentes, mas com **uma implementação única**.

### 2.1 Exemplo básico

```ts
function mostrar(valor: string): string;
function mostrar(valor: number): number;
function mostrar(valor: any): any {
    return valor;
}

mostrar("oi"); // string
mostrar(42); // number
// mostrar(true); // erro
```

**Explicação:** Apenas os tipos declarados nas assinaturas podem ser passados. O `any` é usado internamente.

### 2.2 Aceitando mais tipos

```ts
function mostrar(valor: string): string;
function mostrar(valor: number): number;
function mostrar(valor: boolean): boolean;
function mostrar(valor: any): any {
    return valor;
}

mostrar(true); // agora funciona
```

**Explicação:** Adicionando assinaturas você aceita mais tipos.

### 2.3 Diferentes parâmetros e retornos

```ts
function combinar(a: string, b: string): string;
function combinar(a: number, b: number): number;
function combinar(a: any, b: any): any {
    return a + b;
}

combinar("foo", "bar"); // "foobar"
combinar(10, 20); // 30
```

**Explicação:** Sobrecarga permite que o retorno dependa dos tipos de entrada.

### 2.4 Boas práticas

-   Declare todas as assinaturas **antes da implementação**.
-   Use **type guards** (`typeof`) para diferenciar comportamentos internos.

```ts
function processar(valor: string): string;
function processar(valor: number): number;
function processar(valor: any): any {
    if (typeof valor === "string") {
        return valor.toUpperCase();
    }
    if (typeof valor === "number") {
        return valor * 2;
    }
}
```

**Explicação:** Garante que cada tipo tenha tratamento específico sem quebrar a tipagem externa.

---

## 3. Funções avançadas

### 3.1 Funções genéricas

Permitem usar tipos parametrizados que podem ser inferidos ou passados explicitamente.

```ts
function identidade<T>(valor: T): T {
    return valor;
}

identidade<number>(5); // 5
identidade<string>("hi"); // "hi"
```

**Explicação:** O mesmo código funciona para múltiplos tipos, mantendo tipagem forte.

### 3.2 Funções com callbacks tipados

```ts
function aplicar<T>(a: T, fn: (x: T) => T): T {
    return fn(a);
}

aplicar(5, (n) => n * 2); // 10
```

**Explicação:** Permite que callbacks sejam tipadas de forma segura, garantindo coerência de tipos.

---

## 4. Resumo

| Conceito                   | Explicação/Sintaxe                                                 |
| -------------------------- | ------------------------------------------------------------------ |
| Parâmetro tipado           | Define tipo de entrada: `function f(a: number): number`            |
| Parâmetro opcional         | Pode ser omitido: `nome?: string`                                  |
| Valor padrão               | Assume valor se não passado: `b: number = 2`                       |
| Arrow function             | Função anônima tipada: `(x: number, y: number) => number`          |
| Função tipo variável       | Variável com assinatura: `let f: (a: number, b: number) => number` |
| Retorno `void`             | Sem retorno: `function f(): void { ... }`                          |
| Retorno `never`            | Nunca retorna: `function f(): never { throw ... }`                 |
| Sobrecarga (overload)      | Diferentes assinaturas, mesma implementação                        |
| Funções genéricas          | Tipo parametrizado: `function f<T>(x: T): T`                       |
| Função com callback tipado | Callback tipada: `function f<T>(x: T, cb: (y: T) => T)`            |
