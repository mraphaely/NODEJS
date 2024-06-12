import nodemon from "nodemon";
import { URLSearchParams } from "node:url";
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
        //Query Params = param=valor (https://youtube.com/param)
       // /empregados/porFaixaSalarial?min=30&max=500
       const urlParams = new URLSearchParams(url.split('?')[1]) 
       const minSalario = parseFloat(urlParams.get("min"))
       const maxSalario = parseFloat(urlParams.get("max"))
       
    lerDadosFuncionarios((err, funcionarios)=> {
        if(err){
           response.writeHead(500, {'Content-Type': 'application/json'});
           response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
        return;
        }
    const funcionarioPorFaixaSalarial = funcionarios.filter((funcionario)=>funcionario.salario >= minSalario && funcionario.salario <= maxSalario);

       if(funcionarioPorFaixaSalarial.length === 0){
           response.writeHead(400, {'Content-Type': 'application/json'});
           response.end(JSON.stringify({message: 'Não existe funcionário com essa faixa salárial.'}));
       return;
       } 

    response.writeHead(200, {'Content-Type':'application/json'});
    response.end(JSON.stringify(funcionarioPorFaixaSalarial));
     });
    } else if (method === 'GET' && url.startsWith('/empregados/')){
       const id = url.split('/')[2]
       lerDadosFuncionarios((err, funcionarios)=>{
        if(err){
                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                return;
            };
        const indexFuncionario = funcionarios.findIndex((funcionario)=> funcionario.id === id);

        if(indexFuncionario === -1){
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Funcionário não encontrado.'}));
            return;
        };
        const usuarioEncontrado  = funcionarios[indexFuncionario]
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(usuarioEncontrado));
        }); 
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
      const id = url.split('/')[2]  
      let body = ''
      request.on("data", (chunk) => {
        body+=chunk;
      });
      request.on("end", ()=> {
        const funcionarioAtualizado = JSON.parse(body)
        lerDadosFuncionarios((err, funcionarios)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Erro interno no servidor.'}));
                return;
            }
            const indexFuncionario = funcionarios.findIndex((funcionario)=> funcionario.id === id);//function callback

            if(indexFuncionario === -1){
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Funcionário não encontrado.'}));
                return;
            }
            funcionarios[indexFuncionario] = {...funcionarios[indexFuncionario], ...funcionarioAtualizado};

            fs.writeFile('funcionarios.json', JSON.stringify(funcionarios, null, 2), (err)=> {
                if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({message: 'Erro ao escrever no arquivo.'}));
                    return;
                }
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(funcionarioAtualizado));
            });
        });      
      });
    }else if (method === 'DELETE' && url.startsWith('/empregados/')){
        const id = parseInt(url.split('/')[2]);
        const indexFuncionario = funcionarios.findIndex(
            (funcionario) => funcionario.id === id
        );
        if (indexFuncionario === - 1) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: "Funcionário selecionado não existe na base de dados." }));
            return;
        }
        funcionarios.splice(indexFuncionario, 1);
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: "Funcionário deletado." }));
    }else{
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Página não encontrada.'}))
    }
})
server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT}`)
})