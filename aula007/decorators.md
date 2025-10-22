# Decorators em TypeScript

Decorators são uma funcionalidade experimental do TypeScript que permitem **anotar e modificar classes, métodos, propriedades ou parâmetros** em tempo de compilação.

Eles funcionam como uma **função especial que recebe um alvo (target)** — a classe ou parte dela — e podem alterar o comportamento do código.

---

## 1. Ativando Decorators

Antes de usar, é preciso habilitar no `tsconfig.json`:

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

---

## 2. Sintaxe Básica

Um decorator é definido com `@` antes de uma classe, método, propriedade ou parâmetro.

Exemplo simples:

```ts
function Logger(constructor: Function) {
    console.log("Classe criada:", constructor.name);
}

@Logger
class Pessoa {
    constructor(public nome: string) {}
}
```

---

## 3. Decorator de Classe

```ts
function AddCreatedDate(constructor: Function) {
    constructor.prototype.createdAt = new Date();
}

@AddCreatedDate
class Produto {}

const p = new Produto();
console.log(p.createdAt);
```

---

## 4. Decorator de Método

```ts
function LogarExecucao(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Chamando ${propertyKey} com`, args);
        const resultado = metodoOriginal.apply(this, args);
        console.log(`Resultado:`, resultado);
        return resultado;
    };
}

class Calculadora {
    @LogarExecucao
    soma(a: number, b: number) {
        return a + b;
    }
}

const calc = new Calculadora();
calc.soma(2, 3);
```

---

## 5. Decorator de Propriedade

```ts
function MinLength(tamanho: number) {
    return function (target: any, propertyKey: string) {
        let valor: string;
        const getter = () => valor;
        const setter = (novoValor: string) => {
            if (novoValor.length < tamanho) {
                throw new Error(
                    `O campo ${propertyKey} precisa ter pelo menos ${tamanho} caracteres.`
                );
            }
            valor = novoValor;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
        });
    };
}

class Usuario {
    @MinLength(5)
    senha: string;

    constructor(senha: string) {
        this.senha = senha;
    }
}

const u = new Usuario("12345");
const u2 = new Usuario("123");
```

---

## 6. Decorator de Parâmetro

```ts
function ParamInfo(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Parâmetro ${parameterIndex} do método ${propertyKey}`);
}

class Teste {
    metodo(@ParamInfo msg: string) {
        console.log(msg);
    }
}
```

---

## 7. Ordem de Execução

1. Decorators de parâmetro
2. Decorators de método
3. Decorators de propriedade
4. Decorators de classe

---

## 8. Casos de Uso Comuns

-   Logs e auditoria
-   Validação de dados
-   Injeção de dependências
-   Controle de acesso
-   Criação de metadados (ex: Angular e NestJS)

---

## 9. Exemplo Completo

```ts
function Controller(prefix: string) {
    return function (constructor: Function) {
        constructor.prototype.prefix = prefix;
    };
}

function Get(route: string) {
    return function (target: any, propertyKey: string) {
        if (!target.routes) target.routes = [];
        target.routes.push({ method: "GET", route, handler: propertyKey });
    };
}

@Controller("/api")
class UserController {
    @Get("/users")
    listar() {
        return ["user1", "user2"];
    }
}

const userCtrl = new UserController();
console.log(userCtrl.prefix);
console.log(userCtrl.routes);
```

---

## 10. Conclusão

Decorators permitem adicionar **funcionalidades extras** sem alterar diretamente o código principal da classe.  
Eles são poderosos, mas devem ser usados com cuidado — principalmente em projetos que não têm suporte nativo a eles no JavaScript.
