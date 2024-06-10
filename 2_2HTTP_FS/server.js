import nodemon from "nodemon";
import fs from "node:fs";
import {createServer} from "node:http"
import lerDadosFuncionarios from "./lerFuncionarios.js";
import { v4 as uuidv4 } from 'uuid';

const PORT = 3333

let funcionarios = [];
const server = createServer((request, response)=>{
    const {url, method} = request
    if (method === 'GET' && url === '/empregados') {
      lerDadosFuncionarios((err, funcionarios)=>{
        if(err){
                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                return;
            }
            const totalFuncionarios = funcionarios.length;
               response.writeHead(200, {'Content-Type': 'application/json'});
               response.end(JSON.stringify({"Total de funcionários": totalFuncionarios}));
        });

    } else if (method === 'GET' && url === '/empregados/count'){//terminar
        lerDadosFuncionarios((err, funcionarios) => {
         if (err){  
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
            return;
        }
           response.writeHead(200, {'Content-Type': 'application/json'});
           response.end(JSON.stringify(funcionarios));
        })
    } else if (method === 'GET' && url.startsWith('/empregados/porCargo')){
        const cargo =  url.split('/')[3]
        lerDadosFuncionarios((err, funcionarios)=>{
            if (err){
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
            return;
        }
        const funcionariosPorCargo = funcionarios.filter((funcionario) => funcionario.cargo === cargo);

        if(funcionariosPorCargo.length === 0 ){
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Não há funcionários para esse cargo.'}));
        }
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(funcionariosPorCargo));
        });
    } else if (method === 'GET' && url.startsWith('/empregados/porHabilidade')){
        const habilidade = url.split("/")[3]
        lerDadosFuncionarios((err, funcionarios)=>{
            if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                    return;
            }
            const funcionariosPorHabilidade =  funcionarios.filter((funcionario)=> funcionario.habilidades.includes(habilidade));
            
            if(funcionariosPorHabilidade.length === 0 ){
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Não há funcionários para essa habilidade.'}));
            return
            }
            console.log(funcionariosPorHabilidade)
            return response.end()
        })    

    } else if (method === 'GET' && url.startsWith('/empregados/porFaixaSalarial')){
        
    } else if (method === 'GET' && url.startsWith('/empregados/')){
        
    } else if (method === 'POST' && url === '/empregados/'){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk;
        });
        request.on('end', ()=>{
            const novoFuncionario = JSON.parse(body)
            if(novoFuncionario.idade < 18){
                response.writeHead(403, {'Content-Type': 'application/json'});
            return response.end(JSON.stringify({message: "Idade não permitida."}))
            }
            lerDadosFuncionarios((err, funcionarios)=>{
                if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                    return;
                }
                novoFuncionario.id = uuidv4();
                funcionarios.push(novoFuncionario)
                fs.writeFile('funcionarios.json', JSON.stringify(funcionarios, null, 2), (err)=> {
                    if(err){
                        response.writeHead(500, {'Content-Type': 'application/json'});
                        response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                        return;
                    }
                })
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(novoFuncionario));
            })
        });
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