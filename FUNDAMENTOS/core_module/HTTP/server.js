const http = require('node:http')

const PORT = 3333

//? Exemplo 01
// const server = http.createServer((request, response)=>{
//     response.write('Olá, mundo! Módulo http')
//     response.end()
// })

//? Exemplo 02
// const server = http.createServer((request, response)=>{
//    response.writeHead(202, {"Content-Type":"text/plan"})
//    response.end('Usuário Criado')
// })

//? Exemplo 03
// const server = http.createServer((request, response)=>{
//     if(request.url === '/'){
//         //localhost:3333/
//         response.writeHead(200, {"Content-Type":"text/plan"})
//         response.end('Página inicial')
//     } 
//     else if(request.url === '/sobre'){
//         //localhost:3333/sobre
//         response.writeHead(200, {"Content-Type":"text/plan"})
//         response.end('Página sobre')
//     }else{
//         response.writeHead(404, {"Content-Type":"text/plan"})
//         response.end('Página não encontrada')
//     }
// })

//? Exemplo 04
// const server = http.createServer((request, response)=>{
//       if(request.url === '/'){
//         response.writeHead(200, {"Content-Type":"text/html"})
//         response.write("<meta charset=utf8>")
//         response.write('<h1>Página Inicial</h1>')
//         response.end();
//       }
//       else if(request.url === '/contatos'){
//         response.writeHead(200, {"Content-Type":"text/html"})
//         response.write("<meta charset=utf8>")
//         response.write('<h1>Página Contato</h1>')
//         response.end();
//       }else{
//         response.writeHead(404, {"Content-Type":"text/html"})
//         response.write("<meta charset=utf8>")
//         response.write('<h1>Página não encontrada</h1>')
//         response.end();
//       }
// })

// Exemplo 05
const obj = {
    nome: 'Carlos',
    idade: 32,
    profissao: 'instrutor'
}

const server = http.createServer((request, response)=>{
    if(request.url === '/'){
       response.writeHead(200, {"Content-Type":"application/json"})
       response.end(JSON.stringify(obj))
    }
    else if(request.url === '/contatos'){
        response.writeHead(200, {"Content-Type":"application/json"})
        response.end(JSON.stringify({message: 'Página de Contato'}))
    }else{
        response.writeHead(200, {"Content-Type":"application/json"})
        response.end(JSON.stringify({message: 'Página não encontrada'}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT:${PORT} ✿❁✿`)
})