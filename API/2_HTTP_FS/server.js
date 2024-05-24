/**
 * {
 *  nome: ''
 *  autor: ''
 *  genero: ''
 *  anoPublicacao: ''
 * personagens: [personagem1, 2, 3, 4]
 * }
 */
import http from 'node:http'
import fs from 'node:fs'

const PORT = 3333

const server = http.createServer((request, response)=>{
     const {method, url} = request;
     if(method === 'GET' && url === '/livros'){
        fs.readFile('livros.json','utf8', (err, data)=>{
            if(err){
              response.writeHead(500, {'Content-Type': 'application/json'})
              response.end(JSON.stringify({ message: 'Não foi possível acessar a base de dados'}))
              return;
            }
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(data));
        })
     }else if(method === 'POST' && url === '/livros'){
        let body = '';
        request.on('data', (chunk) => {
            body += chunk
        });
        request.on('end', () => {
            const novoLivro = JSON.parse(body)
            // console.log(novoLivro)
            fs.readFile('livros.json','utf8', (err, data)=>{
                if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({ message: 'Não foi possível acessar a base de dados'}))
                    return;
                }
                const livros = JSON.parse(data)
                novoLivro.id = livros.length + 1
                livros.push(novoLivro)

                fs.writeFile('livros.json', JSON.stringify(livros, null, 2),(err)=>{
                    if (err) {
                        response.writeHead(500,{"Content-Type" : "application/json"});
                        response.end(JSON.stringify({message: 'Arquivo não encontrado'}));
                        return;
                    }
                    response.writeHead(201, {"Content-Type" : "application/json"});
                    response.end(JSON.stringify(novoLivro));
                });    
            });
        });

    } else if(false){

    } else if(false){

    } else if(method === 'GET' && url.startsWith('/livros/')){
        const id = parseInt(url.split('/')[2]);
        console.log(id)
        fs.readFile('livros.json', 'utf8', (err, data)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({ message: 'Não foi possível acessar o arquivo'}))
                return; 
                }
                const livros = JSON.parse(data)
                
                const encontrarLivro = livros.find((livro) => livro.id === id)
            // console.log(encontrarLivro) //* V trás o livro | F - undefined
            if(!encontrarLivro){
                response.writeHead(400, {"Content-Type" : "application/json"});
                response.end(JSON.stringify({message: "Livro não encontrado"}));
                return;
            }

            // console.log(livros)
            response.writeHead(200, {"Content-Type" : "application/json"})
            response.end(JSON.stringify(encontrarLivro))

        });
    } else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        response.end(JSON.stringify({ message: 'Página não encontrada'}))
    }

});

server.listen(PORT, ()=>{
    console.log(`Servidor on http://localhost:${PORT}`);
});