//1° Criar um módulo interno com a função SOMA
//2° Importar o módulo interno no arquivo serve.js
//3° Baixar o módulo  minimist
//4° No terminal> node index.js --a=5 --b=5
//5° "A soma de A + B = AB" 
import minimist from 'minimist';
import soma from './soma.js';

const moduloSoma = soma

const argumentos = minimist(process.argv.slice(2))

const a = argumentos['a'];
const b = argumentos['b'];

console.log(`A soma de ${a} + ${b} = ${moduloSoma(a,b)}`)
