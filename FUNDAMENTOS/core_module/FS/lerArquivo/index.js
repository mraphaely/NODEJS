const http = require('node:http');
const fs = require('node:fs');

const PORT = 3333

const server = http.createServer((request, response) => {
    fs.readFile('./message.html', (error, data) => {
        if (error) {
            // console.log('Error: ', error);
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end(JSON.stringify({ message: 'Erro ao ler o arquivo'}));
            return
        }
        // console.log('Dados: ', data)
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})