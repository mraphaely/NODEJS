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
                novoLivro.id = livros.lenght + 1
                livros.push(novoLivro)

                fs.writeFile('livros.json', JSON.stringify(livros))//parou aqui

                console.log(livros)
                return response.end();
            });
        });
     }else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        response.end(JSON.stringify({ message: 'Página não encontrada'}))
     }

});

server.listen(PORT, ()=>{
    console.log(`Servidor on http://localhost:${PORT}`);
});