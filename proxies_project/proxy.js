// const pessoa = {
//     nome:'DevJocas',
//     idade:20
// }
// const handler = {
//     get(objeto, propriedade){
//         console.log(`Acessar o valor da propriedade: ${propriedade}`)
//         return objeto[propriedade]
//     },
//     set(objeto, propriedade, valor){
//         if(propriedade === 'idade' && valor < 0){
//             throw new Error('Idade nao pode ser negativo')
//         }
//         objeto[propriedade] = valor
//         return true
//     }
// }
// const proxy = new Proxy(pessoa, handler)
// // uso
// console.log(proxy.nome)
// proxy.idade =  30
// console.log(proxy)

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
