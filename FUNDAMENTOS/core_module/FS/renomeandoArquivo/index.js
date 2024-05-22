const fs = require('node:fs');

const arqAntigo = 'arquivo.txt'
const arqNovo = 'novo.txt'

fs.rename(arqAntigo, arqNovo, (err) =>{
    if (err){
        console.log(err)
        return
    };
    console.log(`O arquivo ${arqAntigo} foi renomeado para ${arqNovo}`)
    return
})