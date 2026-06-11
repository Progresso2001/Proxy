// USANDO GET E SET
const pessoa = {
    nome:'DevJocas',
    idade:20
}
const handler = {
    get(objeto, propriedade){
        console.log(`Acessar o valor da propriedade: ${propriedade}`)
        return objeto[propriedade]
    },
    set(objeto, propriedade, valor){
        if(propriedade === 'idade' && valor < 0){
            throw new Error('Idade nao pode ser negativo')
        }
        objeto[propriedade] = valor
        return true
    }
}
const proxy = new Proxy(pessoa, handler)
// uso
console.log(proxy.nome)
proxy.idade =  30
console.log(proxy)

// USANDO DELETEPROPERTY
const pessoa = {
    nome:"Joaquim",
    idade: 23,
    senha:'abcd123@'
}
const handler = {
    deleteProperty(obj, prop){
        if(prop==='senha'){
            console.error("Não pode alterar a senha")
            return false
        }
        console.log(`Deletando propriedade: ${prop}`)
        return delete obj[prop]
    }
}

const proxy =  new Proxy(pessoa, handler)
delete proxy.senha
delete proxy.idade
console.log(proxy)

// USANDO HAS

const pessoa = {nome:"Alberto", idade:23}
const handler =  {
    has(pessoa, prop){
        console.log(`Verificando: ${prop}`)
        return prop in pessoa
    }
}
const proxy =  new Proxy(pessoa, handler)
console.log('nome' in proxy)
console.log('senha' in proxy)

// Usando apply

function saudar(nome){
    return `Ola, ${nome}`
}
const handler={
    apply(funcao, selAgrs, argumento){
        console.log(`Função chamada com: ${argumento}`)
        return funcao(...argumento)
    }
}
const proxy =  new Proxy(saudar, handler)
console.log(proxy('joaquim'))

// usando o construct

class Pessoa {
    constructor(nome, idade){
        this.nome=nome
        this.idade=idade
    }
}
const handler = {
    construct(classe, argumentos){
        console.log(`Criando a nova instancia com os argumentos:${argumentos[0]}, ${argumentos[1]}`)
            return new classe(...argumentos)
    }
}
const proxyClasse =  new Proxy(Pessoa, handler)
const pessoa = new proxyClasse('joaquim', 24)
console.log(pessoa)
// console.log(pessoa.nome[0].toUpperCase() + pessoa.nome.slice(1))
const primLetraMiaus = pessoa.nome.charAt(0).toUpperCase() + pessoa.nome.slice(1)
console.log("Eu sou o:",primLetraMiaus)

// usando o ownkeys()
const objeto = {
  nome: "João",
  idade: 25,
  _temp: "valor secreto"
};
const handler = {
  ownKeys(objeto) {
    console.log("Obtendo propriedades...");
    return Reflect.ownKeys(objeto).filter(prop => !prop.startsWith("_"));
  }
};

const proxy = new Proxy(objeto, handler);

console.log(Object.keys(proxy)); 

getOwnPropertyDescriptor()

const obj = {nome:"Jocas"}
const handler = {
    getOwnPropertyDescriptor(obj, prop){
        console.log(`Descriptor de: ${prop}`)
        return {
            value: obj[prop],
            writable:true,
            enumerable:true,
            configurable:true
        }
    }
}
const proxy = new Proxy(obj, handler)
const desc = Object.getOwnPropertyDescriptor(proxy, 'nome')
console.log(desc)


// usando exemplo simples com get

const pessoa = {nome:'DevJocas'}
const handler = {
    get(pessoa, prop){
        if(prop in pessoa){
            return `Valor da prop: ${pessoa[prop]}`
        }
        return `Prop não existente: ${prop}` //valor padrao
    }
}
const proxy = new Proxy(pessoa, handler)
console.log(proxy.nome)
console.log(proxy.idade)
