# Typescript

Em algumas linguagens, certos erros de tipo podem impedir que o programa seja executado. A detecção de erros sem rodar o código é chamada de **verificação estática**. Determinar se há um erro com base nos tipos dos valores utilizados é chamada de **verificação estática de tipos**.

O TypeScript atua como um verificador de tipos estático: ele analisa seu código antes da execução e aponta erros. Por exemplo, veja este código em JavaScript:

```js
const obj = { width: 10, height: 15 };
// Porque isso é NaN? Ortografia é difícil!
const area = obj.width * obj.heigth; // heigth está escrito errado
```

O TypeScript atua como um verificador de tipos estático: ele analisa seu código antes da execução e aponta erros. Por exemplo:

```ts
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
// Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?
```

## Um Superconjunto Tipado de JavaScript

Como TypeScript se realaciona com JavaScript então?

**Sintaxe**

TypeScript é uma linguagem que é um superconjunto de JavaScript: sintaxe JS é, logo, válida em TS. Sintaxe se refere à forma que escrevemos texto para formar um programa. Por exemplo, este código tem um erro de sintaxe porque falta um `)`:

```ts
let a = (4
```

```arduino
')' expected.
```

TypeScript não considera qualquer código JavaScript como um erro por sua sintaxe. Isso significa que você pode pegar qualquer código funcional JavaScript e colocar em um arquivo TypeScript sem se preocupar em como está escrito.

---

## Tipos

TypeScript adiciona regras sobre como diferentes tipos de valores podem ser usados. Por exemplo, o erro de `obj.heigth` não é sintaxe, mas sim um uso incorreto de um tipo de valor.

Outro exemplo em JavaScript, que roda normalmente no browser:

```js
console.log(4 / []);
```

Ele imprime `Infinity`. TypeScript considera a divisão de um número por um array uma operação sem sentido e aponta um erro:

```
The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
```

O verificador de tipos ajuda a prevenir erros comuns, mantendo programas corretos. É possível configurar o nível de rigor da verificação.

Se você mover código JavaScript para TypeScript, erros de tipo podem aparecer. Eles podem ser problemas reais ou apenas o TS sendo conservador demais. É possível adicionar sintaxe TypeScript para resolver esses erros.

---

## Comportamento em Tempo de Execução

TypeScript preserva o comportamento de tempo de execução do JavaScript. Por exemplo, dividir por zero ainda produz `Infinity`. Mesmo que o TypeScript aponte erros de tipo, o código compilado vai rodar da mesma forma que JavaScript puro. Isso facilita a transição entre JS e TS sem mudar o funcionamento do programa.

---

## Tipos Apagados

Depois que o compilador do TypeScript verifica o código, ele remove os tipos e gera JavaScript puro. Isso significa que os tipos existem apenas durante a compilação; eles não alteram o comportamento do programa em tempo de execução.

TypeScript não adiciona bibliotecas extras: seu código continua usando as mesmas bibliotecas padrão ou externas do JavaScript.

## Aprendendo JavaScript e TypeScript

Nós frequentemente vemos a questão “Eu deveria aprender JavaScript ou TypeScript?“.

A resposta é que vocẽ não pode aprender TypeScript sem aprender JavaScript! TypeScript compartilha sintaxe e comportamento de tempo de execução com JavaScript, então qualquer coisa que você queira aprender sobre JavaScript estará ajudando você a aprender TypeScript ao mesmo tempo.

Há muitos recursos disponíveis para programadores aprenderem JavaScript; você não deveria ignorar estes recursos se você está escrevendo TypeScript. Por exemplo, há cerca de 20 vezes mais questões no StackOverflow marcadas com javascript do que com typescript, mas todas as questões javascript também se aplicam ao TypeScript.

Se você se encontra procurando por algo como “como organizar uma lista em TypeScript”, lembre-se: TypeScript é o ambiente de execução do JavaScript com verificador de tipo em tempo de compilação. A forma com que você organiza uma lista em TypeScript é a mesma no JavaScript. Se você encontrar um recurso que usa TypeScript diretamente isso é ótimo também, mas não se limite a pensar que você precisa de respostas específicas do TypeScript para questões do dia a dia sobre como alcançar tarefas do ambiente de execução.

# Checando tipos de arquivos JavaScript

## Propriedades são inferidas de atribuições no corpo das classes

ES2015 não tem meios de declaração de propriedades em uma classe. Propriedades são atribuídas dinamicamente, assim como objetos literais.

Em um arquivo `.js`, o compilador infere propriedades a partir da atribuição dentro de uma classe. O tipo de uma propriedade é o tipo dado no construtor, a não ser que não seja definido lá ou seja `undefined` ou `null`. Neste caso, o tipo é uma união dos tipos de todos os valores atribuídos.

Propriedades definidas no construtor são sempre assumidas existentes, enquanto as definidas apenas em métodos, getters ou setters são consideradas opcionais.

```ts
class C {
    constructor() {
        this.constructorOnly = 0;
        this.constructorUnknown = undefined;
    }
    method() {
        this.constructorOnly = false;
        // Type 'boolean' is not assignable to type 'number'.

        this.constructorUnknown = "plunkbat"; // ok, string | undefined
        this.methodOnly = "ok"; // ok, mas methodOnly também pode ser undefined
    }
    method2() {
        this.methodOnly = true; // ok, type: string | boolean | undefined
    }
}
```

Se propriedades nunca forem declaradas no corpo da classe, elas são consideradas `unknown`. Para propriedades apenas de leitura, use JSDoc para anotar o tipo no construtor:

```ts
class C {
    constructor() {
        /** @type {number | undefined} */
        this.prop = undefined;
        /** @type {number | undefined} */
        this.count;
    }
}

let c = new C();
c.prop = 0; // OK
c.count = "string";
// Type 'string' is not assignable to type 'number'.
```

---

## Funções construtoras equivalentes a classes

Antes do ES2015, JS usava funções construtoras em vez de classes. O compilador suporta esse padrão:

```ts
function C() {
    this.constructorOnly = 0;
    this.constructorUnknown = undefined;
}
C.prototype.method = function () {
    this.constructorOnly = false;
    // Type 'boolean' is not assignable to type 'number'.

    this.constructorUnknown = "plunkbat"; // ok
};
```

---

## CommonJS modules são suportados

Em `.js`, TypeScript entende módulos CommonJS. Atribuições a `exports` ou `module.exports` são reconhecidas como exportações, e chamadas a `require` são reconhecidas como importações:

```ts
const fs = require("fs"); // como `import fs from "fs"`
module.exports.readFile = function (f) {
    return fs.readFileSync(f);
};
```

---

## Classes, funções e object literals como namespaces

Classes e funções podem ser usadas como namespaces:

```ts
class C {}
C.D = class {};

function Outer() {
    this.y = 2;
}
Outer.Inner = function () {
    this.yy = 2;
};
Outer.inner();
```

Também é possível criar namespaces simples:

```ts
var ns = {};
ns.C = class {};
ns.func = function () {};
ns;
```

E outras variantes, incluindo IIFE e atribuições globais:

```ts
var ns = (function (n) {
    return n || {};
})();
ns.CONST = 1;

var assign = assign || function () {};
assign.extra = 1;
```

---

## Objetos literais são abertos em JS

Em `.ts`, objetos literais dão o tipo para a variável e membros não declarados geram erro. Em `.js`, objetos literais têm tipo aberto:

```ts
var obj = { a: 1 };
obj.b = 2; // Permitido
```

Para restringir, use JSDoc:

```ts
/** @type {{a: number}} */
var obj = { a: 1 };
obj.b = 2;
// Property 'b' does not exist on type '{ a: number; }'.
```

---

## Inicializadores null, undefined e arrays vazios

Variáveis, parâmetros ou propriedades inicializados com `null` ou `undefined` terão tipo `any`. Arrays vazios terão tipo `any[]`:

```ts
function Foo(i = null) {
    if (!i) i = 1;
    var j = undefined;
    j = 2;
    this.l = [];
}

var foo = new Foo();
foo.l.push(foo.i);
foo.l.push("end");
```

---

## Parâmetros de funções são opcionais por padrão

Funções JS pre-ES2015 tratam todos os parâmetros como opcionais:

```ts
function bar(a, b) {
    console.log(a + " " + b);
}

bar(1); // OK
bar(1, 2); // OK
bar(1, 2, 3); // Erro: argumentos em excesso
// Expected 0-2 arguments, but got 3.
```

Use JSDoc para marcar parâmetros opcionais:

```ts
/**
 * @param {string} [somebody] - O nome de alguém.
 */
function sayHello(somebody) {
    if (!somebody) somebody = "John Doe";
    console.log("Hello " + somebody);
}
sayHello();
```

---

## Declarações var-args e parâmetros não especificados

Funções que usam `arguments` são inferidas como var-args:

```ts
/** @param {...number} args */
function sum(/* numbers */) {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
```

Parâmetros sem tipo têm padrão `any`.

---

## Parâmetros genéricos em extends e JSDoc

Em `.js`, não há como declarar tipos genéricos em `extends`. Por padrão, são `any`:

```ts
import { Component } from "react";
class MyComponent extends Component {
    render() {
        this.props.b; // Permitido, type: any
    }
}
```

Use JSDoc para especificar tipos explicitamente:

```ts
import { Component } from "react";
/**
 * @augments {Component<{a: number}, State>}
 */
class MyComponent extends Component {
    render() {
        this.props.b; // Erro: b não existe em {a: number}
    }
}
```

---

## Inferência de tipos com JSDoc

Tipos não especificados em JSDoc padrão são `any`:

```ts
/** @type {Array} */
var x = [];
x.push(1); // OK
x.push("string"); // OK, tipo Array<any>

/** @type {Array.<number>} */
var y = [];
y.push(1); // OK
y.push("string"); // Erro
```

Chamadas de função genérica inferem tipos pelos argumentos. Se falhar, parâmetros serão `any`:

```ts
var p = new Promise((resolve, reject) => {
    reject();
});
p; // Promise<any>
```

---

# Baixar o TypeScript

O TypeScript pode ser instalado de três maneiras, dependendo de como você pretende usá-lo: como um **módulo npm**, um **pacote NuGet** ou uma **extensão do Visual Studio**.

Se você estiver usando **Node.js**, use a versão **npm**.  
Se estiver usando **MSBuild** no seu projeto, use o **pacote NuGet** ou a **extensão do Visual Studio**.

---

## TypeScript no seu projeto

Configurar o TypeScript por projeto permite que você tenha vários projetos, cada um com uma versão diferente do TypeScript.  
Isso mantém cada projeto funcionando de forma consistente.

---

### via npm

O TypeScript está disponível como um pacote no registro npm, com o nome **"typescript"**.

Você precisará ter o **Node.js** instalado para executar o pacote.  
Depois, use um gerenciador de dependências como **npm**, **yarn** ou **pnpm** para baixar o TypeScript no seu projeto.

```bash
npm install typescript --save-dev
```

Todos esses gerenciadores de dependências suportam **lockfiles**, garantindo que todos na sua equipe usem a mesma versão da linguagem.

Depois disso, você pode rodar o compilador TypeScript usando um dos seguintes comandos:

```bash
npx tsc
```

---

# tsconfig.json

## Visão geral

A presença de um arquivo **`tsconfig.json`** em um diretório indica que esse diretório é a **raiz de um projeto TypeScript**.  
O arquivo **`tsconfig.json`** especifica os **arquivos raiz** e as **configurações de compilação** necessárias para o projeto.

Projetos **JavaScript** podem ter um arquivo **`jsconfig.json`**, que tem quase o mesmo propósito, mas possui algumas flags do compilador relacionadas ao JavaScript já habilitadas por padrão.

---

## Compilação de um projeto

Um projeto pode ser compilado de duas maneiras principais:

### Usando `tsconfig.json` ou `jsconfig.json`

1. **Invocando o `tsc` sem arquivos de entrada** — o compilador procura o arquivo `tsconfig.json` começando no diretório atual e continua nas subpastas.
2. **Usando a opção `--project` ou `-p`** — permite especificar o caminho do diretório que contém o `tsconfig.json` ou de um arquivo `.json` válido com configurações.

> Quando arquivos de entrada são passados diretamente na linha de comando, o `tsconfig.json` é **ignorado**.

---

## Exemplo

### Usando a propriedade `"files"`

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ]
}
```

---

### Usando `"include"` e `"exclude"`

```json
{
    "compilerOptions": {
        "module": "system",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts"]
}
```

---

## Configurações Básicas

Dependendo do ambiente de execução JavaScript em que você deseja rodar seu código, pode haver uma **configuração base** disponível em  
[github.com/tsconfig/bases](https://github.com/tsconfig/bases).

Esses são arquivos `tsconfig.json` prontos que seu projeto pode **estender**, simplificando o seu próprio arquivo.

Por exemplo, se você está desenvolvendo um projeto Node.js versão 12 ou superior, pode usar o módulo npm **`@tsconfig/node12`**:

```json
{
    "extends": "@tsconfig/node12/tsconfig.json",
    "compilerOptions": {
        "preserveConstEnums": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "**/*.spec.ts"]
}
```

Isso permite que seu `tsconfig.json` se concentre apenas nas **configurações específicas** do seu projeto, sem precisar lidar com os detalhes do ambiente de execução.

Configurações básicas recomendadas incluem:

-   **Node 10**
-   **Node 12**
-   **Deno**
-   **React Native**
-   **Svelte**

---

## Detalhes

A propriedade `"compilerOptions"` pode ser **omitida**, caso em que os padrões do compilador serão usados.  
Veja a [lista completa de opções do compilador TypeScript](https://www.typescriptlang.org/tsconfig) para mais detalhes.

---

# Opções da CLI do tsc

## Usando a CLI

Executar o **`tsc`** localmente vai compilar o projeto mais próximo definido por um **`tsconfig.json`**, ou você pode compilar um conjunto de arquivos TypeScript passando um **glob** de arquivos.

> Quando arquivos de entrada são especificados na linha de comando, os arquivos `tsconfig.json` são **ignorados**.

### Exemplos

```bash
# Compila baseado no tsconfig.json mais próximo
tsc

# Gera JS apenas para index.ts usando as opções padrão do compilador
tsc index.ts

# Gera JS para todos os arquivos .ts na pasta src usando as opções padrão
tsc src/*.ts

# Compila arquivos usando as configurações do tsconfig.production.json
tsc --project tsconfig.production.json

# Gera apenas os arquivos de declaração (.d.ts) para um arquivo JS
tsc index.js --declaration --emitDeclarationOnly

# Gera um único arquivo .js a partir de dois arquivos .ts usando opções do compilador
tsc app.ts util.ts --target esnext --outfile index.js
```

# Ferramentas do TypeScript em 5 minutos

Vamos começar construindo uma aplicação web simples com TypeScript.

---

## Instalando TypeScript

Existem duas formas principais de adicionar o TypeScript ao seu projeto:

-   Via **npm** (gerenciador de pacotes do Node.js)
-   Instalando os **plugins do TypeScript para Visual Studio**

O Visual Studio 2017 e o Visual Studio 2015 Update 3 já incluem suporte à linguagem TypeScript, mas **não incluem o compilador `tsc`**.  
Se você não instalou o TypeScript junto com o Visual Studio, ainda é possível baixá-lo.

Para usuários de npm:

```bash
npm install -g typescript
```

---

## Criando seu primeiro arquivo TypeScript

No seu editor, crie um arquivo chamado **`greeter.ts`** com o seguinte código JavaScript:

```ts
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

---

## Compilando seu código

Usamos a extensão `.ts`, mas este código é apenas JavaScript.  
Você poderia ter copiado diretamente de uma aplicação JavaScript existente.

Na linha de comando, execute:

```bash
tsc greeter.ts
```

O resultado será um arquivo **`greeter.js`**, contendo o mesmo JavaScript que você colocou.  
Agora estamos usando TypeScript na nossa aplicação JavaScript!

---

## Anotações de tipo

Podemos adicionar uma **anotação de tipo** ao parâmetro `person` da função:

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

As **anotações de tipo** são uma forma leve de registrar o contrato pretendido de funções ou variáveis.

Exemplo de erro ao passar um tipo errado:

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.textContent = greeter(user);
```

> Erro: `Argument of type 'number[]' is not assignable to parameter of type 'string'.`

Mesmo com erros, o arquivo **`greeter.js`** ainda é criado. O TypeScript avisa que o código **provavelmente não rodará como esperado**, mas não impede a compilação.

---

## Interfaces

Vamos evoluir o exemplo usando uma **interface**:

```ts
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user);
```

Em TypeScript, dois tipos são compatíveis se suas **estruturas internas forem compatíveis**.  
Isso permite implementar uma interface apenas tendo a forma exigida, sem precisar de `implements`.

---

## Classes

TypeScript suporta recursos modernos do JavaScript, como **programação orientada a objetos baseada em classes**:

```ts
class Student {
    fullName: string;
    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```

> Classes em TypeScript são apenas **shorthand** para o mesmo modelo de OO baseado em protótipos usado no JavaScript.

---

## Rodando sua aplicação web TypeScript

Crie um arquivo **`greeter.html`**:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>TypeScript Greeter</title>
    </head>
    <body>
        <script src="greeter.js"></script>
    </body>
</html>
```

Abra no navegador para rodar sua primeira aplicação web simples em TypeScript.

---

### Recursos adicionais

Opcionalmente, abra **`greeter.ts`** no Visual Studio ou copie o código para o [TypeScript Playground](https://www.typescriptlang.org/play):

-   Posicione o cursor sobre identificadores para ver seus tipos.
-   Tipos podem ser inferidos automaticamente.
-   Pressione **F12** em uma função para ir à definição.
-   Clique com o botão direito em um símbolo para **refatoração** ou renomeação.

O TypeScript integra informações de tipo às ferramentas, permitindo trabalhar com JavaScript em **escala de aplicação**.

# ts-node

O **ts-node** é uma ferramenta que permite executar arquivos **TypeScript** diretamente no **Node.js**, sem precisar pré-compilar para JavaScript. Ele transforma o código TypeScript em JavaScript **em tempo real** (JIT - Just In Time), facilitando o desenvolvimento e testes rápidos.

---

## 🔧 O que é o ts-node?

O **ts-node** funciona como um motor de execução e **REPL** (Read-Eval-Print Loop) para Node.js.  
Ele permite rodar arquivos `.ts` diretamente, sem compilação prévia.

Isso é possível porque ele **intercepta as APIs de carregamento de módulos** do Node.js e aplica a transformação de TypeScript para JavaScript **em memória**.  
Fonte: TypeStrong

---

## 🚀 Como usar o ts-node

### Instalação global

```bash
npm install -g ts-node typescript
```

### Instalação local no projeto

```bash
npm install --save-dev ts-node typescript
```

---

### Executando arquivos TypeScript

```bash
ts-node arquivo.ts
```

> Isso vai executar o arquivo `.ts` diretamente, sem precisar gerar `.js`.

---

### REPL interativo

Você também pode iniciar um **REPL TypeScript**:

```bash
ts-node
```

> Permite digitar código TypeScript linha a linha e ver o resultado imediatamente.

# Typescript Playground

é um compilador de `.ts` online
