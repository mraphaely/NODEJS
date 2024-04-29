//console.log() -> qualquqer tipo de variável

const a = 12
const b = 'Maryana'
const c = [1, 2, 3]

console.log(a, b, c)

//contabilidade de quantas vezes o console aparece?
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)
console.count(`O valor de a é: ${a}, contagem`)

//Variável entre as string
console.log('O nome dele é %s, ele é programador %s', b, b)

//Executar algo em um tempo pré-determinado
setInterval(() =>{
    console.clear()
}, 3000)