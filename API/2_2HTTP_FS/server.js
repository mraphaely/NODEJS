import nodemon from "nodemon";
import fs from "node:fs";
import {createServer} from "node:http"
import lerDadosFuncionarios from "./lerFuncionarios.js";

const PORT = 3333

const server = createServer((request, response)=>{
    const {url, method} = request
    if (method === 'GET' && url === '/empregados') {
        lerDadosFuncionarios((err, funcionarios)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                return;
            }
               response.writeHead(200, {'Content-Type': 'application/json'});
               response.end(JSON.stringify(funcionarios));
        });
        
    } else if (method === 'GET' && url === '/empregados/count'){
        
    } else if (method === 'GET' && url.startsWith('/empregados/porCargo')){
        
    } else if (method === 'GET' && url.startsWith('/empregados/porHabilidade')){
        
    } else if (method === 'GET' && url.startsWith('/empregados/porFaixaSalarial')){
        
    } else if (method === 'GET' && url.startsWith('/empregados/')){
        
    } else if (method === 'POST' && url === '/empregados/'){
        
    }else if (method === 'PUT' && url.startsWith('/empregados/')){
        
    }else if (method === 'DELETE' && url.startsWith('/empregados/')){
        
    }else{
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Página não encontrada.'}))
    }
})
server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}`)
})