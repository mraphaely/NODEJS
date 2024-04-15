//teminal integrado cmd -> node index.js
const fs = require('node:fs')
fs.readFile('teste.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data)
})