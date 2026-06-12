# Proxy em JavaScript

Este repositório demonstra como usar o **Proxy** em JavaScript para interceptar e personalizar operações em objetos.

O `Proxy` permite criar uma camada entre o código e um objeto original, conhecida como **target**, para controlar comportamentos como leitura, escrita, remoção de propriedades, chamada de funções e muito mais. [web:1][web:5]

## O que é Proxy?

`Proxy` é um objeto nativo do JavaScript que envolve outro objeto e permite definir comportamentos customizados para operações fundamentais. [web:1][web:7]

Ele é muito útil para:

- Validar dados.
- Registrar acessos a propriedades.
- Bloquear alterações indesejadas.
- Criar comportamentos dinâmicos.
- Implementar regras de negócio em objetos. [web:1][web:5]

## Estrutura básica

Um `Proxy` é criado com:

- **target**: o objeto original.
- **handler**: objeto que define as regras.
- **traps**: funções que interceptam operações, como `get`, `set`, `deleteProperty` e outras. [web:3][web:5]

```js
const target = {
  name: "DevJocas",
  age: 20,
  cidade:"Kapalanga"
};

const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : "Propriedade não encontrada";
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // João
console.log(proxy.city); // Propriedade não encontrada
```

## Exemplo com `set`

Você também pode controlar o valor atribuído a uma propriedade. Isso é útil para validação. [web:1][web:3]

```js
const user = {
  name: "Maria",
  age: 18
};

const userProxy = new Proxy(user, {
  set(obj, prop, value) {
    if (prop === "age" && value < 0) {
      throw new Error("A idade não pode ser negativa.");
    }

    obj[prop] = value;
    return true;
  }
});

userProxy.age = 25;
console.log(userProxy.age); // 25

// userProxy.age = -5; // Erro
```

## Traps mais usados

Alguns dos traps mais comuns são:

- `get`: intercepta leitura de propriedades.
- `set`: intercepta escrita de propriedades.
- `has`: intercepta o operador `in`.
- `deleteProperty`: intercepta remoção de propriedades.
- `apply`: intercepta chamada de funções.
- `construct`: intercepta uso com `new`. [web:3][web:5]

## Quando usar

Use `Proxy` quando precisar de controle extra sobre objetos, como:

- Validação automática de dados.
- Logs de acesso.
- APIs internas com regras específicas.
- Encapsulamento de comportamento. [web:1][web:5]

## Exemplo prático

```js
const product = {
  name: "Notebook",
  price: 3500
};

const productProxy = new Proxy(product, {
  get(obj, prop) {
    if (prop === "price") {
      return `R$ ${obj[prop]}`;
    }
    return obj[prop];
  }
});

console.log(productProxy.name);  // Notebook
console.log(productProxy.price); // R$ 3500
```

## Observações

- `Proxy` é uma feature nativa do JavaScript moderno. [web:1][web:7]
- Ele pode deixar o código mais poderoso, mas também mais difícil de ler se usado em excesso.
- Em muitos casos, vale combinar `Proxy` com `Reflect` para manter o comportamento padrão de forma mais segura. [web:5]

## Requisitos

- Node.js 16+ ou navegador moderno.

## Como executar

```bash
node index.js
```

## Licença

Este projeto pode ser usado como material de estudo e adaptação para outros repositórios.
