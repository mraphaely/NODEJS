//O método map cria um novo array com os resultados de uma função fornecida em cada elemento do array chamado. E não modifica o array original

//O método filter cria um novo array com todos os elementos que passam no teste implementado pela função fornecida. Ele não modifica o array original.

//O método reduce aplica uma função a um acumulador e a cada elemento do array(da esquerda para a direita) de forma a reduzi-lo a um único valor.

let nums = [3, 2, 1, 6, 9];

// map: multiplicar os números
let dobrados = nums.map(num => num * 3)
console.log(dobrados);

// filter: apenas os números pares
let pares = nums.filter(num => num % 2 === 0)
console.log(pares);

// reduce: somar todos os números
let soma = nums.reduce((total, num) => total + num, 0);
console.log(soma);

//Módulos internos são aqueles nativos do Node, assim que o baixamos temos esses módulos disponíveis.Alguns deles são: 
//fs que oferece diversas funcionalidades para manipulação de arquivos e diretórios. Para criar um diretório somente se ele não existir, podemos utilizar a função fs.
const fs = require('fs') 
console.log(fs.appendFile())// acrescenta dados em um arquivo. Se o arquivo não existir, ele é criado.

//os que disponibiliza diversas funções, podendo usar para obter informações do sistema operacional e do computador em que o programa está executando, e interagir com ele.
import os from 'node:os';
console.log(os.type())
console.log(`A arquitetura do sistema operacional é ${os.arch()}`)

//Usamos module.exports ou exports para disponibilizar partes do código para outros arquivos e require() para usar o código exportado em outro arquivo.
//Diferença: module.exports é o objeto retornado por require(). exports é uma referência para module.exports. Se você tentar atribuir um novo valor a exports, ele não afetará module.exports.