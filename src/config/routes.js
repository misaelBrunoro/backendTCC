const express = require('express');

module.exports = function(server) {

    // Definir URL base
    const router = express.Router();
    server.use('/api', router);

    // Rotas da Pergunta
    const Pergunta = require('../api/Pergunta/PerguntaService');
    Pergunta.register(router, '/Perguntas');

    // Rotas da Resposta
    const Resposta = require('../api/Resposta/RespostaService');
    Resposta.register(router, '/Respostas');

    // Rotas do Anexo
    const Anexo = require('../api/Anexo/AnexoService');
    Anexo.register(router, '/Anexos');
}