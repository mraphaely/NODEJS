const http = require('node:http')
const fs = require('node:fs')

const PORT = 3333
const funcionarios = []//base de dados

const server = http.createServer((request, response) => {
    const { method, url } = request
    //localhost:3333/RotasDaAplicação
    if (method === 'GET' && url === '/funcionarios') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(funcionarios))
    }
    else if (method === 'POST' && url === '/funcionarios') {
        let body = ''
        
        request.on('data', (chunk) => {
            body += chunk.toString()
        })
        request.on('end', () => {
            const funcionario = JSON.parse(body)
            if(funcionario.idade > 17){
                response.writeHead(403, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ message: "Restrição de idade" }))
                return
            }
            //valida senha
            if (funcionario.senha !== funcionario.confirmaSenha) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: 'Senhas não correspondem' }));
                return
            }
            funcionario.id = funcionarios.length + 1
            funcionarios.push(funcionario)
            response.writeHead(201, { "Content-Type": "application/json" })
            response.end(JSON.stringify(funcionario));
        })
    }
    else if (method === 'GET' && url === '/funcionarios/count') {
        const totalFuncionarios = funcionarios.length
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'Número total de funcionários é:': totalFuncionarios }))
    }
    else if (method === 'GET' && url === '/participantes/porCargo/') {
        const funcionarioCargo = funcionarios.filter((funcionario) => funcionario.cargo)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(funcionarioCargo))
    }
    else if (method === 'GET' && url === '/participantes/porHabilidade/{habilidade}') {
        const funcionarioHab = funcionarios.filter((funcionario) => funcionario.habilidade)
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(funcionarioHab))
    }
    //fazer
    else if (method === 'GET' && url === '/participantes/porFaixaSalarial/?min={min}&max={max}') {
    }
    else if (method === 'GET' && url.startsWith('/funcionarios/')) {
        const id = parseInt(url.split("/")[2])
        const encontrarFuncionario = funcionarios.find(
            (funcionario) => funcionario.id === id
        );
        if (!funcionarios) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Funcionário não encontrado.' }));
            return
        }
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(encontrarFuncionario));
    }
    //Put está dando erro (404 corrigir depois);
    else if (method === 'PUT' && url.startsWith('/funcionarios/')) {
        const id = parseInt(url.split('/')[2]);
        let body = ''
        
        request.on("data", (chunk) => {
            body += chunk;
        })
        request.on('end', () => {
            const funcionarioAtualizado = JSON.parse(body)

            const indexFuncionario = funcionarios.findIndex((funcionario) => funcionario.id === id);
            
            if (indexFuncionario === -1) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: "Funcionário selecionado não existe." }));
                return;
            }

            funcionarios[indexFuncionario] = {...funcionarios[indexFuncionario], ...funcionarioAtualizado};

            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(funcionarioAtualizado));
        });
    } 
    else if (method === 'DELETE' && url.startsWith('/funcionarios/')) {
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
    } else {
        console.log(`${method}, ${url} `)
        response.end()
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})