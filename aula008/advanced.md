## 📘 1. Mapped Types

### 💡 Conceito

Mapped Types permitem **criar novos tipos com base em outros tipos existentes**, modificando as propriedades (por exemplo, tornando todas opcionais, readonly, etc.).

É como aplicar um “map” nas propriedades de um tipo.

---

### 🧱 Exemplo básico

```ts
type User = {
    id: number;
    name: string;
    email: string;
};

// Criando um novo tipo com todas as propriedades opcionais
type PartialUser = {
    [K in keyof User]?: User[K];
};

// Equivale a:
type PartialUserManual = {
    id?: number;
    name?: string;
    email?: string;
};
```

👉 `keyof User` → gera `"id" | "name" | "email"`
👉 `[K in keyof User]` → percorre cada chave
👉 `User[K]` → obtém o tipo do valor correspondente

---

### 🧰 Exemplo prático

```ts
type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};
```

Agora, todas as propriedades de `ReadonlyUser` não podem ser alteradas:

```ts
const user: ReadonlyUser = { id: 1, name: "Bruno", email: "b@b.com" };
// user.name = "Lucas"; // Erro
```

---

### ⚙️ Mapped Types Genéricos

Você pode criar tipos genéricos reutilizáveis, como o TypeScript faz internamente:

```ts
type MyPartial<T> = {
    [K in keyof T]?: T[K];
};

type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
};

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

---

## ⚖️ 2. Conditional Types

### 💡 Conceito

Conditional Types permitem **criar tipos dinâmicos baseados em condições**.

Sintaxe:

```ts
T extends U ? X : Y
```

Se `T` for um subtipo de `U`, o tipo resultante é `X`; caso contrário, é `Y`.

---

### 🧱 Exemplo básico

```ts
type IsString<T> = T extends string ? "Sim" : "Não";

type A = IsString<string>; // "Sim"
type B = IsString<number>; // "Não"
```

---

### 🧰 Exemplo prático

```ts
type ApiResponse<T> = T extends Error
    ? { success: false; message: string }
    : { success: true; data: T };

type Ok = ApiResponse<{ id: number }>;
// { success: true; data: { id: number } }

type Fail = ApiResponse<Error>;
// { success: false; message: string }
```

---

### 🧩 Condicional com `infer`

`infer` permite **extrair um tipo de dentro de outro**.

```ts
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;

type Example = ReturnTypeOf<() => number>; // number
```

---

## 🔠 3. Literal Types

### 💡 Conceito

Literal Types fixam valores específicos, em vez de apenas o tipo geral.

```ts
let direction: "left" | "right" | "up" | "down";
direction = "left"; // ok
direction = "top"; // erro
```

---

### 🧰 Exemplo prático

```ts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function request(url: string, method: HttpMethod) {
    console.log(`Requesting ${method} ${url}`);
}

request("/users", "POST"); // ok
// request("/users", "PATCH"); // erro
```

---

### 📦 Literal + inferência

```ts
const car = {
    brand: "BMW",
    model: "M4",
} as const;

// car.brand tem tipo "BMW" (literal), não apenas string
```

---

## 🧩 4. Template Literal Types

### 💡 Conceito

Permitem **criar novos tipos de string dinamicamente**, combinando **literais** com **interpolação** (como string templates do JS).

---

### 🧱 Exemplo básico

```ts
type Prefix = "user" | "admin";
type RoleId = `${Prefix}_id`;

let id: RoleId;

id = "user_id"; // ok
id = "admin_id"; // ok
id = "guest_id"; // erro
```

---

### 🧰 Exemplo prático

```ts
type EventName = `on${Capitalize<string>}`;
```

```ts
type HttpStatus = 200 | 404 | 500;
type HttpStatusMessage = `Error_${HttpStatus}`;

let msg: HttpStatusMessage;
msg = "Error_404"; // ok
```

---

### 🧠 Template + infer

```ts
type ExtractPrefix<T> = T extends `${infer Prefix}_id` ? Prefix : never;

type A = ExtractPrefix<"user_id">; // "user"
type B = ExtractPrefix<"admin_id">; // "admin"
```

---

## 🔁 5. Recursive Types

### 💡 Conceito

Recursive Types são tipos que **se referem a si mesmos** — usados para representar **estruturas aninhadas**, como JSON, árvores, nós etc.

---

### 🧱 Exemplo básico

```ts
type Category = {
    name: string;
    subcategories?: Category[];
};
```

```ts
const category: Category = {
    name: "Eletrônicos",
    subcategories: [
        {
            name: "Computadores",
            subcategories: [{ name: "Notebooks" }],
        },
    ],
};
```

---

### 🧰 Exemplo prático: JSON genérico

```ts
type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };
```

---

### 🧩 Outro exemplo: Árvores

```ts
type Tree<T> = {
    value: T;
    children?: Tree<T>[];
};

const tree: Tree<number> = {
    value: 10,
    children: [{ value: 5 }, { value: 15, children: [{ value: 20 }] }],
};
```

---

# 🚀 Resumo Geral

| Tipo                       | O que faz                                               | Exemplo rápido              |
| -------------------------- | ------------------------------------------------------- | --------------------------- |
| **Mapped Types**           | Cria tipos a partir de outros modificando chaves        | `[K in keyof T]`            |
| **Conditional Types**      | Define tipos baseados em condição                       | `T extends U ? X : Y`       |
| **Literal Types**          | Define valores fixos possíveis                          | `"left" \| "right"`         |
| **Template Literal Types** | Cria tipos de string dinâmicos                          | `` `${Prefix}_${Suffix}` `` |
| **Recursive Types**        | Tipos que se referem a si mesmos (estruturas aninhadas) | `{ children?: Category[] }` |

---
