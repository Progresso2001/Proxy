// Validação de dados

const usuario = {nome:'', idade:0}
const validar = new Proxy(usuario, {
    set(target, prop, valor){
        if(prop === 'idade' && (valor < 0 || valor > 150)){
            throw new Error('Idade invalida!')
        }
        if(prop === 'nome' && valor.length < 3){
            throw new Error('Nome muito curto!')
        }
        target[prop] = valor
        return true
     }
})
validar.nome = 'Ana'
validar.idade = 100
console.log(validar)

// Prop privada
const dado = {_senha:'1234', nome:'Maria'}
const dadoPrivado = new Proxy(dado, {
    get(target, prop){
        if(prop.startsWith('_')){
            throw new Error("Propriedade privada")
        }
        return target[prop]
    },
    set(target, prop, valor){
        if(prop.startsWith('_')){
            throw new Error('Não podemos mudar o valor da propriedade')
        }
        target[prop] = valor
        return true
    }
})
dadoPrivado._senha = '12@45'
console.log(dadoPrivado._senha)
console.log(dadoPrivado.nome)

// Logging Automatico
function calculadora(a,b){
    return a + b
}
const proxyFunc = new Proxy(calculadora, {
    apply(target, thisArgs, args){
        console.log(`Chamando ${target.name} com argumentos: ${args}`)
        const resultado = target(...args)
        console.log(`Resultado: ${resultado}`)
        return resultado
    }
})
proxyFunc(3,4)

// valores padrao

const linguagens = new Proxy({}, {
    get(target, prop){
        return prop in target ? target[prop] : 'Linguagens desconhecida'
    }
})
linguagens.js = 'JavaScript'
linguagens.py = 'Python'
console.log(linguagens)
console.log(linguagens.mongoDB)

// interceptar informacao usando has e in
const cofre = {senha:'1234', saldo:1000}
const protegido = new Proxy(cofre, {
    has(target, prop){
        if(prop === 'senha') return false //vai bloquear a saida de informacao
        return prop in target 
    }
})
console.log('saldo' in protegido)
console.log('senha' in protegido) //bloqueado mesmo existindo

// deleteProperty -controla deleções
const tarefas = { a: "Estudar", b: "Trabalhar", c: "Descansar", d:'Brincar' };

const controlador = new Proxy(tarefas, {
  deleteProperty(target, prop) {
    if (prop === "a") {
      throw new Error("Não pode deletar Estudar!");
    }
    console.log(`Deletando: ${prop}`);
    delete target[prop];
    return true;
  }
});

delete controlador.d; 
// delete controlador.a;  
console.log(controlador)


// ownkeys e getPropertyDescriptor()
const usuario = { nome: "João", _senha: "123", email: "joao@email.com" };

const filtrado = new Proxy(usuario, {
  ownKeys(target) {
    // Filtra propriedades que começam com _
    return Object.keys(target).filter(key => !key.startsWith("_"));
  },
  
  getOwnPropertyDescriptor(target, prop) {
    // Necessário para evitar erro com Object.keys()
    return {
      enumerable: true,
      configurable: true,
      value: target[prop]
    };
  }
});

console.log(Object.keys(filtrado)); 

// construct interceptar o new

class Animal{
    constructor(nome){
        this.nome = nome
    }
}
const ProxyAnimal = new Proxy(Animal, {
    construct(target, args){
        console.log(`Criando novo animal:${args[0]}`)
        // validar e modificar argumento
        const nomeFormatado = args[0].toUpperCase()
        // retorna a instancia nova
        return new target(nomeFormatado)
    }
})
const gato = new ProxyAnimal("poquito")
console.log(gato.nome)

// defineProperty e preventExtensios interceptam Object

const config = {versao:"1.0"}
const travado = new Proxy(config, {
    defineProperty(target, prop, descriptor){
        if(prop === 'versao'){
            throw new Error("Versão somente para leitura")
        }
        return Object.defineProperty(target, prop, descriptor)
    },
    preventExtensions(target){
        console.log("Tentativa de travar o objeto")
        return Object.preventExtensions(target)
    }
})

travado.novo = "teste"
travado.versao  = "2.0"
console.log(travado.versao)
Object.preventExtensions(travado)

// revocable - Proxies que podem ser desativada
const dados = {segredo:'confidencial'}
const { proxy, revoke } = Proxy.revocable(dados, {
    get(target, prop){
        console.log(`Acessando ${prop}`)
        return target[prop]
    }
})
// console.log(proxy.segredo)
revoke()
console.log(proxy.segredo) // TypeError: Cannot perform 'get' on a proxy that has been revoked
