
console.log(process.argv)

const args = process.argv.slice(2)

console.log(args)

//['[nome]=[Jubscreud]','idade=32']
//[       0           ,       1   ]
const nome = args[0].split('')[1]
console.log(nome)
//'nome','Jubscreud'
//    1 ,  2

const idade = args[1].split('')[1]
console.log(idade)

console.log(`O nome do usuário: ${nome} e idade ${idade}`)