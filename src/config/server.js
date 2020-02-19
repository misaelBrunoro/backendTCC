// Porta de escuta
const port = process.env.PORT || 80;

// Dependencias
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const cors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors);

var app = server.listen(port, function() {
    console.log(`Backend is running in port ${port}.`);
});

module.exports = {server, app};