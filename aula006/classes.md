# Classes em TypeScript

Classes permitem **criar objetos com propriedades e métodos**, suportando conceitos de programação orientada a objetos como **herança, polimorfismo e encapsulamento**.

---

## 1. Constructor Parameters (Parâmetros do construtor)

O **construtor** é um método especial que roda quando a classe é instanciada. Você pode passar parâmetros para inicializar a classe.

```ts
class Pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
}

const p = new Pessoa("Bruno", 17);
```

**Explicação:**

-   `constructor` recebe parâmetros e inicializa propriedades.
-   `this` se refere à instância atual.

---

## 2. Access Modifiers (Modificadores de acesso)

TypeScript suporta **modificadores de acesso** para controlar visibilidade das propriedades/métodos:

-   `public` → acessível de qualquer lugar (padrão)
-   `private` → só acessível dentro da classe
-   `protected` → acessível dentro da classe e subclasses

```ts
class Funcionario {
    public nome: string;
    private salario: number;
    protected cargo: string;

    constructor(nome: string, salario: number, cargo: string) {
        this.nome = nome;
        this.salario = salario;
        this.cargo = cargo;
    }

    mostrarSalario() {
        console.log(this.salario);
    }
}
```

**Explicação:**

-   `nome` pode ser acessado fora da classe.
-   `salario` só pode ser acessado dentro da classe.
-   `cargo` pode ser acessado em subclasses.

---

## 3. Abstract Classes (Classes abstratas)

Classes abstratas **não podem ser instanciadas diretamente** e servem como modelo para outras classes.

```ts
abstract class Animal {
    abstract fazerSom(): void;

    mover() {
        console.log("Movendo-se...");
    }
}

class Cachorro extends Animal {
    fazerSom() {
        console.log("Au au!");
    }
}

const dog = new Cachorro();
dog.fazerSom(); // "Au au!"
dog.mover(); // "Movendo-se..."
```

**Explicação:**

-   `abstract` obriga subclasses a implementar métodos abstratos.
-   Permite ter métodos comuns para todas as subclasses.

---

## 4. Inheritance vs Polymorphism (Herança vs Polimorfismo)

-   **Herança:** uma classe herda propriedades e métodos de outra (`extends`).
-   **Polimorfismo:** objetos de classes diferentes podem ser tratados como objetos do mesmo tipo base.

```ts
class Veiculo {
    mover() {
        console.log("Movendo veículo");
    }
}

class Carro extends Veiculo {
    mover() {
        console.log("Movendo carro");
    } // overriding
}

let v: Veiculo = new Carro();
v.mover(); // "Movendo carro" → polimorfismo
```

**Explicação:**

-   Herança permite **reaproveitar código**.
-   Polimorfismo permite **usar objetos derivados como se fossem do tipo base**, chamando o método certo.

---

## 5. Method Overriding (Sobrescrita de métodos)

Subclasses podem **reescrever métodos da classe base**.

```ts
class Pessoa {
    cumprimentar() {
        console.log("Olá!");
    }
}

class Estudante extends Pessoa {
    cumprimentar() {
        console.log("Oi, eu sou estudante!");
    }
}

const e = new Estudante();
e.cumprimentar(); // "Oi, eu sou estudante!"
```

**Explicação:**

-   Subclasses podem customizar comportamento de métodos da classe base.
-   Se quiser, é possível chamar o método original via `super.cumprimentar()`.

---

## 6. Constructor Overloading (Sobrecarga de construtor)

TypeScript **não suporta sobrecarga direta como Java**, mas podemos simular com **parâmetros opcionais ou union types**.

```ts
class Produto {
    nome: string;
    preco: number;

    constructor(nome: string);
    constructor(nome: string, preco: number);
    constructor(nome: string, preco?: number) {
        this.nome = nome;
        this.preco = preco ?? 0; // default 0
    }
}

const p1 = new Produto("Caneta");
const p2 = new Produto("Caderno", 10);
```

**Explicação:**

-   Declaramos múltiplas assinaturas de construtor (somente assinaturas).
-   A implementação real deve lidar com todos os casos (`preco?`).

---

## 7. Resumo

| Conceito                | Explicação                                          |
| ----------------------- | --------------------------------------------------- |
| Constructor Parameters  | Inicializa a classe com valores                     |
| Access Modifiers        | Controla visibilidade: public, private, protected   |
| Abstract Classes        | Não instanciáveis, definem contrato para subclasses |
| Inheritance             | Herda propriedades e métodos de outra classe        |
| Polymorphism            | Objetos de subclasses tratados como tipo base       |
| Method Overriding       | Subclasses podem reescrever métodos da classe base  |
| Constructor Overloading | Simulado com parâmetros opcionais ou union types    |
