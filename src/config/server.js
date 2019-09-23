// Porta de escuta
const port = 3003;

// Dependencias
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const cors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors);

server.listen(port, function() {
    console.log(`Backend is running in port ${port}.`);
});

module.exports = server;