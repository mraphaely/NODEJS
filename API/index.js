//Desenvolva uma API que possibilite o cadastro de participantes de eventos, onde cada participante deverá fornecer informações como nome, e-mail, senha, idade e cidade onde mora. A API deve oferecer um conjunto completo de operações CRUD (Create, Read, Update, Delete) para gerenciar os participantes.
import http from 'node:http'

const PORT = 3333

const participants = []; //base de dados

const server = http.createServer((request, response) => {
    const { method, url } = request
    //localhost:3333/participants

    if (method === 'GET' && url === '/participants') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participants))
    }

    else if (method === 'GET' && url === '/participants/count') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participants.length))
    }
    //localhost:3333/participants/count/over18
    else if (method === 'GET' && url === '/participants/count/over18') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participants.length))
        
    }
    else if (method === 'GET' && url === '/participants/city/most') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(participants.length.city))
        
    }

    else if (method === 'POST' && url === '/participants') {
        let body = ''
        const novoparticipant = JSON.parse(body)
        if(novoparticipant.idade < 16){
            response.writeHead(404, { "Content-Type": "application/json" })
            response.end(JSON.stringify({ message: "Participante não tem idade o suficiente" }))
            return
        }
        request.on('data', (chunk) => {
            body += chunk.toString()
        })
        request.on('end', () => {
            novoparticipant.id = participants.length + 1
            participants.push(novoparticipant)
            response.writeHead(201, { "Content-Type": "application/json" })
            response.end()
        })
    }

    else if (method === 'PUT' && url.startsWith('/participants/')) {
        //1° encontrar um user
        const id = parseInt(url.split('/')[2])
        //2° receber atualizações atualizdas
        let body = ''
        request.on('data', (chunk) =>
            body += chunk.toString()
        )
        request.on('end', () => {
            const participantAtualizado = JSON.parse(body)
            //3° encontar user/validar se existe
            const indexParticipant = participants.findIndex((participant) => participant.id === id)
            if (indexParticipant === -1) {
                response.writeHead(404, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: "Participante não existe" }))
                return
            }
            //4° atualizar dados
            participants[indexParticipant] = { ...participants[indexParticipant], ...participantAtualizado }
            //5° resposta de confirmação
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(participants[indexParticipant]))
        })
    }
    else if (method === 'DELETE' && url.startsWith('/participants/')) {
        const id = parseInt(url.split('/')[2])
        const encontrarparticipant = participants.findIndex((participant) => participant.id === id)
        if (encontrarparticipant === -1) {
            response.writeHead(404, { 'Content-Type': 'application.json' })
            response.end(JSON.stringify({ message: 'Participante não encontrado' }))
            return
        }
        participants.splice(encontrarparticipant, 1)//remove
        response.writeHead(200, { 'Content-Type': 'application.json' })
        response.end(JSON.stringify({ message: 'Participante Deletado' }))
    }

    else if (method === 'GET' && url.startsWith('/participants/')) {
        //http://localhost:3333/participants/1
        const id = parseInt(url.split('/')[2])
        const participant = participants.find((participant) => participant.id === id)
        if (!participants) {
            response.writeHead(404, { "Content-Type": "application/json" })
            response.end(JSON.stringify({ message: 'Usuário não encontrado' }))
            return
        }

        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(participant))

    } else {
        response.writeHead(404, { "Content-Type": "application/json" })
        response.end(JSON.stringify({ message: 'Rota NÃO EXISTE' }))
    }
})

server.listen(PORT, () => {
    console.log(`Servidor on PORT: ${PORT}🫠`)
})