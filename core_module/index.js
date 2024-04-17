//Módulos Externos
//Módulos Internos
//Módulo Cores - fs, os, path, url, http
const path = require('node:path');

const extensao = path.extname('documento.pdf')

if(extensao === '.pdf'){
    console.log('Arquivo enviado')
}else{
    console.log('Arquivo com extensão diferente')
}