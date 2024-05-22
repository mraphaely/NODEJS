const fs = require('node:fs');

fs.unlink('arquivo.txt', (err)=>{
    if(err){
        return console.log(err);
    }
    return console.log('Arquivo excluído!');
});