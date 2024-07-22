const http = require('http');
const fs = require('fs');

//banco de dados
const pessoas = [];

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    if (req.url.startsWith('/pessoas/endereco/')) {
      // Rota para adicionar endereço a uma pessoa
      const id_pessoa = req.url.split('/')[3]; // Obtém o ID da pessoa da URL
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        const { rua, numero, cidade, estado, cep } = JSON.parse(body);
        // Validação dos campos (você pode adicionar mais validações)
        if (!rua || !numero || !cidade || !estado || !cep) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Campos obrigatórios não preenchidos.' }));
          return;
        }
        // Salva o endereço no banco de dados 
        
        const endereco = { rua, numero, cidade, estado, cep, id_pessoa };
        pessoas.push(endereco);
        res.statusCode = 201;
        res.end('Endereço adicionado com sucesso.');
      });
