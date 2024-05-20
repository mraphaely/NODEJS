const http = require('node:http')
const fs = require('node:fs')

const PORT = 3333

const server = http.createServer((request, response) => {
    
})

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})