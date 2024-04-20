const os = require('node:os');

console.log(os.cpus());//quantos computares estão rodando na máquina
console.log(os.cpus()[0].model);//computador especifico
console.log(os.freemem());//Quantidade de memória disponivel em em bites
console.log(os.homedir());//verifica qual diretorio está rodando a aplicação
console.log(os.type());//vê o sistema operacional da máquina