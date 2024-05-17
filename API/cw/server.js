import http, { request } from "node:http";

const PORT = 3333

const participantes = []
const server = http.createServer((request, response) => {
    const { method, url } = request
    //localhost:3333/RotasDaAplicação
    if (method === 'GET' && url === '/participantes') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participantes))
    }
    else if (method === 'POST' && url === '/participantes') {
        let body = ''
        request.on('data', (chunk) => {
            body += chunk
        })
        request.on('end', () => {
            const participante = JSON.parse(body)
            if (participante.idade < 16) {
                response.writeHead(403, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: 'Apenas usúarios maiores de 15 anos' }));
                return
            }
            //valida senha
            if (participante.senha !== participante.confirmarSenha) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: 'Senhas não correspondem' }));
                return
            }
            participante.id = participantes.length + 1
            participantes.push(participante)
            response.writeHead(201, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(participante))
        })
    }
    else if (method === 'GET' && url === '/participantes/count') {
        const contarParticipantes = participantes.length
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'Número total de participantes:': contarParticipantes }))
    }
    else if (method === 'GET' && url === '/participantes/count/over18') {
        const participanteMaior18 = participantes.filter(
            (participante) => participante.idade > 18
        );
        const quantidadeMaior18 = participanteMaior18.length
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 'Número total de participantes maiores de 18:': quantidadeMaior18 }))
    }
    else if (method === 'GET' && url === '/participantes/city/most') {
        const contandoCidades = participantes.reduce((acumular, participante)=>{
            // soma = soma + valor  
            acumular[participante.cidade] = (acumular[participante.cidade] || 0) + 1 
         
            return acumular
        }, {})
        // console.log(contandoCidades)
        //{'Maceió': 3, Marechal : 2, 'São Luiz': 2}
        //[  ['Maceió', '3'], ['Marechal', '2'], ['São Luiz', '2']  ]
        let quantidadeDeParticipante = 0
        let cidadeComMaiorQuantidadeDeParticipante = 0
        Object.entries(contandoCidades).forEach(([cidade, count])=>{
          if(count > quantidadeDeParticipante){
            quantidadeDeParticipante = count
            cidadeComMaiorQuantidadeDeParticipante = cidade
          }
        })
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ 
            "Quantidade total de participantes": quantidadeDeParticipante, 
            "Cidade com maior quantidade de participantes": cidadeComMaiorQuantidadeDeParticipante, 
        }));
    }
    else if (method === 'PUT' && url.startsWith('/participantes/')) {
        const id = parseInt(url.split('/')[2]);
        let body = ''
        
        request.on("data", (chunk) => {
            body += chunk;
        })
        request.on('end', () => {
            const participanteAtualizado = JSON.parse(body)

            const indexParticipante = participantes.findIndex(
                (participante) => participante.id === id
            );
            
            if (indexParticipante === -1) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: "Participante selecionado não existe." }));
                return;
            }

            participantes[indexParticipante] = {
                ...participantes[indexParticipante], ...participanteAtualizado
            };
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(participantes[indexParticipante]));
        })
    }
    else if (method === 'DELETE' && url.startsWith('/participantes/')) {
        const id = parseInt(url.split('/')[2]);
        const indexParticipante = participantes.findIndex(
            (participante) => participante.id === id
        );
        if (indexParticipante === - 1) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: "Participante selecionado não existe." }));
            return;
        }
        participantes.splice(indexParticipante, 1);
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: "Participante deletado." }));
    }
    else if (method === 'GET' && url.startsWith('/participantes/')) {
        const id = parseInt(url.split("/")[2])
        const encontrarParticipante = participantes.find(
            (participante) => participante.id === id
        );
        if (!participantes) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Participante não encontrado.' }));
            return
        }
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(encontrarParticipante));
    } else {
        console.log(`${method}, ${url} `)
        response.end()
    }
})//criar o servidor

server.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})//liberar acesso ao servidor

