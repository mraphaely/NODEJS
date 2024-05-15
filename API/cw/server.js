import http, { request } from "node:http";

const PORT = 3333

const participantes = []
const server = http.createServer((request, response) => {
    const {method, url} = request
   //localhost:3333/RotasDaAplicação
   if(method === 'GET' && url === '/participantes'){
    response.writeHead(200, {'Content-Type' : 'application/json'})
    response.end(JSON.stringify(participantes))
   }
   else if(method === 'POST' && url === '/participantes'){
    let body = ''
    request.on('data', (chunk) => {
        body += chunk
    })
    request.on('end', () => {
        const participante = JSON.parse(body)
        if(participante.idade < 16){
            response.writeHead(403, {'Content-Type' : 'application/json'})
            response.end(JSON.stringify({message: 'Apenas usúarios maiores de 15 anos'}));
           return
        }
        //valida senha
        if(participante.senha !== participante.confirmarSenha){
            response.writeHead(404, {'Content-Type' : 'application/json'})
            response.end(JSON.stringify({message: 'Senhas não correspondem'}));
           return
        }
           participante.id = participantes.length +1
           participante.push(participante)
           response.writeHead(201, {'Content-Type' : 'application/json'})
           response.end(JSON.stringify(participante))

        console.log(participante.nome)
        response.end();
    })
   }
   else if(method === 'GET' && url === '/participantes/count'){
    console.log(`${method}, ${url} 3`)
    response.end()
   }
   else if(method === 'GET' && url === '/participantes/count/over18'){
    console.log(`${method}, ${url} 4`)
    response.end()
   }
   else if(method === 'GET' && url === '/participantes/city/most'){
    console.log(`${method}, ${url} 5`)
    response.end()
   }
   else if(method === 'PUT' && url.startsWith('/participantes/')){
    console.log(`${method}, ${url} 6`)
    response.end()
   }
   else if(method === 'DELETE' && url.startsWith('/participantes/')){
    console.log(`${method}, ${url} 7`)
    response.end()
   }
   else if(method === 'GET' && url.startsWith('/participantes/')){
    const id = parseInt(url.split("/")[2])
    const encontrarParticipante = participantes.find(
        (participante) => participante.id === id 
    );
    if(!participantes){
        response.writeHead(404, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({message: 'Participante não encontrado.'}));
        return
    }
    response.writeHead(200, {'Content-Type' : 'application/json'})
    response.end(JSON.stringify(encontrarParticipante));
   }else{ 
    console.log(`${method}, ${url} `)
    response.end()
   }
})//criar o servidor

server.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})//liberar acesso ao servidor

