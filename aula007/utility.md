# 🧠 Utility Types do TypeScript — Guia Completo

Os **Utility Types** são tipos pré-definidos pelo TypeScript que ajudam a **transformar, manipular ou extrair informações** de outros tipos. Eles evitam repetição e tornam o código mais seguro e conciso.

---

## 1. **Partial<T>**

Transforma **todas as propriedades** de um tipo em **opcionais**.

```ts
interface User {
    id: number;
    name: string;
    email: string;
}

// Antes: todas obrigatórias
const user1: User = { id: 1, name: "Bruno", email: "a@b.com" };

// Depois com Partial: todas opcionais
const user2: Partial<User> = { name: "Bruno" };
```

📘 Útil para **atualizações parciais** (ex: PATCH em APIs).

---

## 2. **Readonly<T>**

Torna **todas as propriedades imutáveis** (não podem ser alteradas após definidas).

```ts
interface Config {
    version: string;
    port: number;
}

const appConfig: Readonly<Config> = {
    version: "1.0.0",
    port: 3000,
};

// appConfig.port = 8080; ❌ Erro: propriedade readonly
```

📘 Útil para **constantes de configuração** ou **dados que não devem ser alterados**.

---

## 3. **Pick<T, K>**

Cria um novo tipo pegando **somente certas chaves** de outro tipo.

```ts
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PublicUser = Pick<User, "id" | "name">;

const u: PublicUser = { id: 1, name: "Bruno" };
```

📘 Útil para **criar versões públicas ou parciais** de objetos.

---

## 4. **Omit<T, K>**

Cria um novo tipo **removendo certas chaves** de outro tipo.

```ts
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type SafeUser = Omit<User, "password">;

const u: SafeUser = { id: 1, name: "Bruno", email: "a@b.com" };
```

📘 É o **inverso de Pick**.

---

## 5. **Record<K, T>**

Cria um **objeto tipado**, onde as chaves têm tipo `K` e os valores têm tipo `T`.

```ts
type Roles = "admin" | "user" | "guest";

interface Info {
    accessLevel: number;
}

const roles: Record<Roles, Info> = {
    admin: { accessLevel: 10 },
    user: { accessLevel: 5 },
    guest: { accessLevel: 1 },
};
```

📘 Útil para **mapas de configuração**, **dicionários** e **enumerações tipadas**.

---

## 6. **Exclude<T, U>**

Remove de `T` todos os tipos que **também estão em `U`**.

```ts
type Status = "success" | "error" | "pending";
type NotPending = Exclude<Status, "pending">;

// NotPending = "success" | "error"
```

📘 Útil para **filtrar tipos indesejados**.

---

## 7. **Extract<T, U>**

Extrai de `T` **somente os tipos que também estão em `U`**.

```ts
type Status = "success" | "error" | "pending";
type ActiveStatus = Extract<Status, "success" | "pending">;

// ActiveStatus = "success" | "pending"
```

📘 É o oposto de **Exclude**.

---

## 8. **NonNullable<T>**

Remove `null` e `undefined` de um tipo.

```ts
type MaybeString = string | null | undefined;
type OnlyString = NonNullable<MaybeString>;

// OnlyString = string
```

📘 Útil quando você quer **garantir que um valor não seja nulo**.

---

## 9. **ReturnType<T>**

Pega o **tipo de retorno** de uma função.

```ts
function createUser() {
    return { id: 1, name: "Bruno" };
}

type UserReturn = ReturnType<typeof createUser>;

// UserReturn = { id: number; name: string; }
```

📘 Muito usado para **tipar funções sem repetir o tipo de retorno**.

---

## 10. **Parameters<T>**

Extrai o **tipo dos parâmetros** de uma função como uma tupla.

```ts
function sum(a: number, b: number) {
    return a + b;
}

type SumParams = Parameters<typeof sum>;

// SumParams = [number, number]
```

📘 Útil para **reutilizar tipos de argumentos** de uma função em outra.

---

## 11. **InstanceType<T>**

Retorna o tipo da **instância** de uma classe.

```ts
class Car {
    constructor(public brand: string, public year: number) {}
}

type CarInstance = InstanceType<typeof Car>;

const bmw: CarInstance = new Car("BMW", 2024);
```

📘 Muito usado em **fábricas de classes** ou **injeção de dependência**.

---

## 12. **Awaited<T>**

Resolve o **tipo dentro de uma Promise** (ou async function).

```ts
type ResponsePromise = Promise<string>;

type ResponseValue = Awaited<ResponsePromise>;
// ResponseValue = string

async function getData() {
    return { name: "Bruno" };
}

type Data = Awaited<ReturnType<typeof getData>>;
// Data = { name: string }
```

📘 Substitui manualmente fazer `Promise<T>` → `T`.

---

## 🔁 Comparativo rápido

| Utility Type        | Descrição rápida                                   |
| ------------------- | -------------------------------------------------- |
| **Partial<T>**      | Torna todas as propriedades opcionais              |
| **Readonly<T>**     | Torna todas as propriedades imutáveis              |
| **Pick<T, K>**      | Escolhe apenas algumas chaves                      |
| **Omit<T, K>**      | Remove algumas chaves                              |
| **Record<K, T>**    | Cria um objeto tipado com chaves e valores         |
| **Exclude<T, U>**   | Remove tipos de outro tipo                         |
| **Extract<T, U>**   | Mantém apenas tipos que também estão em outro tipo |
| **NonNullable<T>**  | Remove null e undefined                            |
| **ReturnType<T>**   | Obtém o tipo de retorno de uma função              |
| **Parameters<T>**   | Obtém os parâmetros de uma função                  |
| **InstanceType<T>** | Obtém o tipo de instância de uma classe            |
| **Awaited<T>**      | Obtém o tipo resolvido de uma Promise              |

---

## 🧩 Dica extra

Você pode **combinar utility types**:

```ts
interface User {
    id: number;
    name: string;
    email?: string;
}

type ReadonlyPartialUser = Readonly<Partial<User>>;

const user: ReadonlyPartialUser = { id: 1 };

// user.id = 2 ❌ Erro (readonly)
```

---

## 📚 Conclusão

Os **Utility Types** permitem **reaproveitar e transformar tipos existentes**, mantendo o código limpo e seguro.
Eles são parte essencial da **programação avançada em TypeScript**, principalmente quando você trabalha com **tipagem genérica, APIs e POO**.

---

quer que eu te gere esse mesmo conteúdo em `.md` pra baixar depois?
