import http from 'node:http'

const PORT = 3333
/*
!5 ROTAS

*1- GET -> listar todos os usuarios
*2- GET -> listar um ÚNICO USER
*3- POST -> criar/cadastrar user
*4- PUT -> atualizar um user
*5- DELETE -> deletar um user
*/
/*
! 3 tipos de REQUISIÇÃO
* body -> via formulário -> POST
* ROUTER -> parâmetros -> GET, PUT, DELETE, PATH
* QUERY -> /usuarios?param1=valor1&param2=valor2&param3=valor3 -> GET
*/
const usuarios = []
const server = http.createServer((request, response)=>{
    const {method, url} = request
//localhost:3333/usuarios
    if(method === 'GET' && url === '/usuarios'){
    /*
    1xx -> Informativo
    2xx -> Sucesso
    3xx -> Redirecionamento
    4xx -> Erro do cliente
    5xx -> Erro do servidor
    */    
        response.writeHead(200, {'Content-Type':'application/json'})
        response.end(JSON.stringify(usuarios))    
    }

    else if(method === 'POST' && url === '/usuarios'){
        response.end('POST /usuarios')   
        let body = ''
        request.on('data', (chunk)=>{
        //linha 1 {
        //linha 2 "nome":"Carlos Wilton"
        //linha 3 }
          body += chunk.toString()
        })
        request.on('end', ()=>{
           const novoUsuario = JSON.parse(body)
           novoUsuario.id = usuarios.length + 1
           usuarios.push(novoUsuario)
           response.writeHead(201, {"Content-Type":"application/json"})
           response.end()
        })
    }

    else if(method === 'PUT' && url.startsWith('/usuarios/')){
        response.end('PUT /usuarios')    
    }

    else if(method === 'DELETE' &&  url.startsWith('/usuarios/')){
        response.end('DELETE /usuarios')    
    }

    else if(method === 'GET' &&  url.startsWith('/usuarios/')){
        //http://localhost:3333/usuarios/1
        //Split -> [localhost:3333, usuarios, 1]
        //         [            0,    1,      2]
        const id = url.split('/')[2]
        const usuario = usuarios.find((usuario)=>usuario.id === id)
        if(!usuarios){
              response.writeHead(404, {"Content-Type":"application/json"})
              response.end(JSON.stringify({message: 'Usuário não encontrado'}))
          return    
        }

        response.writeHead(200, {"Content-Type":"application/json"})
        response.end(JSON.stringify(usuario))  
    }else{
        response.writeHead(404, {"Content-Type":"application/json"})
        response.end(JSON.stringify({message: 'Rota NÃO EXISTE'}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}🫠`)
})