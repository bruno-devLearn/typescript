# TypeScript Interfaces

Interfaces são uma forma de **definir contratos para objetos, funções e classes**, garantindo que certas propriedades e métodos existam com tipos específicos.

---

## 1. Types vs Interfaces

### Diferenças principais

-   **Interface:** Principalmente para objetos e classes, suporta extensão (`extends`) e mesclagem de declarações.
-   **Type alias:** Pode ser usado para objetos, primitivas, união (`|`), interseção (`&`), etc., mas não suporta mesclagem de declarações.

### Exemplos

```ts
// Interface
interface Pessoa {
    nome: string;
    idade: number;
}

// Type alias
type PessoaType = {
    nome: string;
    idade: number;
};

// Unindo tipos com type alias
type Funcionario = PessoaType & { cargo: string };
```

**Explicação:** Interfaces são ideais para contratos de objetos/classes; types são mais flexíveis, mas não podem ser reabertos.

---

## 2. Extending Interfaces

Interfaces podem **herdar de outras interfaces**, permitindo reutilização e extensão de tipos.

```ts
interface Animal {
    nome: string;
}

interface Cachorro extends Animal {
    raca: string;
}

const meuCachorro: Cachorro = {
    nome: "Rex",
    raca: "Labrador",
};
```

**Explicação:** `Cachorro` possui todas as propriedades de `Animal` + suas próprias propriedades.

-   Interfaces também podem **herdar múltiplas interfaces**:

```ts
interface Mamifero {
    temPelo: boolean;
}

interface Gato extends Animal, Mamifero {
    miar(): void;
}
```

---

## 3. Interface Declaration Merging

Diferente de type aliases, **interfaces podem ser declaradas várias vezes** e serão combinadas automaticamente.

```ts
interface Produto {
    nome: string;
}

interface Produto {
    preco: number;
}

const p: Produto = {
    nome: "Caneta",
    preco: 3.5,
};
```

**Explicação:** As duas declarações de `Produto` se unem; útil para estender tipos existentes sem modificar código original.

---

## 4. Hybrid Types

Interfaces podem definir **objetos que se comportam como funções e têm propriedades** ao mesmo tempo.

```ts
interface Contador {
    (inicio: number): string;
    valorAtual: number;
    reset(): void;
}

function criarContador(): Contador {
    let contador = <Contador>function (inicio: number) {
        return `Contando desde ${inicio}`;
    };
    contador.valorAtual = 0;
    contador.reset = () => {
        contador.valorAtual = 0;
    };
    return contador;
}

const c = criarContador();
console.log(c(10)); // "Contando desde 10"
c.valorAtual = 5;
c.reset();
```

**Explicação:** Combina comportamento de função e objeto; útil para bibliotecas ou padrões avançados.

---

## 5. Resumo

| Conceito                      | Explicação                                                     |
| ----------------------------- | -------------------------------------------------------------- |
| Interface                     | Define contrato de propriedades e métodos para objetos/classes |
| Type vs Interface             | Type é mais flexível; Interface suporta extensão e merge       |
| Extending Interfaces          | Permite herança e múltiplas interfaces                         |
| Interface Declaration Merging | Mescla múltiplas declarações da mesma interface                |
| Hybrid Types                  | Interfaces que combinam funções com propriedades               |
