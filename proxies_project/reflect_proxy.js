// usa se o reflect para manter o comportamento padrao
const validar = new Proxy({},{
    set(target, prop, valor){
        const sucess = Reflect.set(target, prop, valor)
        if(sucess && prop === 'preco'){
            console.log(`Preço atualizado ${prop}`)
        }
        return sucess
    },
    deleteProperty(target, prop){
        console.log(`Tentando deletar ${prop}`)
        return Reflect.deleteProperty(target, prop)
    }
})
validar.preco = 100
validar.nome = 'mouse'
delete validar.nome
console.log('nome' in validar)
console.log(validar)

// Deep Proxy
function deepProxy(obj, handler) {
  return new Proxy(obj, {
    ...handler,
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      // Aplica proxy recursivamente para objetos
      if (value && typeof value === "object") {
        return deepProxy(value, handler);
      }
      return value;
    }
  });
}

const deep = deepProxy({ user: { profile: { name: "John" } } }, {
  set: (target, prop, value) => {
    console.log(`Alteração profunda em ${prop}`);
    return Reflect.set(target, prop, value);
  }
});

deep.user.profile.name = "Jane";  // Log: Alteração profunda em name

const obj = {
    get nome(){
        return this._nome
    },
    _nome:"Ana"
}

const proxySemReflect = new Proxy(obj, {
    get(target,prop){
        return target[prop]
    }
})
const proxyComReflect = new Proxy(obj, {
    get(target,prop, receiver){
        const reflect = Reflect.get(target, prop, receiver)
        return reflect
    }
})
console.log(proxySemReflect.nome)
console.log(proxyComReflect.nome)

// composicao de comportamento

function loggingProxy(target, nomeDoLog){
    return new Proxy(target, {
        get(target, prop){
            console.log(`[${nomeDoLog}] Lendo ${String(prop)}`)
            return Reflect.get(target, prop)
        },
        set(target, prop, valor){
            console.log(`[${nomeDoLog}] Escrevendo ${String(prop)} = ${valor}`);
            return Reflect.set(target, prop, valor)
        },
        apply(target, thisArgs, args){
            console.log(`[${nomeDoLog}] chamando a função com args: ${args}`);
            return Reflect.set(target, thisArgs, args)  
        }
    })
}
const dado = {x:10, y:35}
const logging = loggingProxy(dado, 'DEBUG')
logging.x = 45
logging.y = 10
console.log(logging)