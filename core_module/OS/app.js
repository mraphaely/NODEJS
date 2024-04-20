import os from 'node:os';

//Atividade 1: Informações do Sistema Operacional
console.log(os.type())
console.log(`A arquitetura do sistema operacional é ${os.arch()}`)
console.log(os.arch())

//Atividade 2: Informações do Processador
console.log(os.cpus())

//Atividade 3: Informações de memória
console.log(`O total de memória RAM do sistema é ${os.totalmem()}`)

//Atividade 4: Informações do Usuário
console.log(`O nome do usuário do sistema atual é ${os.userInfo().username}`)
console.log(`O diretório inicial do usuário é ${os.homedir()}`)

//Atividade 5: Detalhes do Sistema Operacional
console.log(`O nome do sistema operacional é ${os.version()}`)
console.log(`A versão do sistema operacional é ${os.platform()}`)

//Atividade 6: Pesquise outros métodos e propriedades do módulo OS
console.log(`O número IPV4 de rede é ${os.networkInterfaces().lo0[0].address}`)
console.log(`O número IPV6 de rede é ${os.networkInterfaces().lo0[0].address}`)

console.log(`O tempo de atividade do sistema operacional é ${os.uptime()}`)
console.log(`O diretório temporário é ${os.tmpdir()}`)