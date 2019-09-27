const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router();
    server.use('/api', protectedApi);

    protectedApi.use(auth);

    // Rotas da Pergunta
    const Pergunta = require('../api/Pergunta/PerguntaService');
    Pergunta.register(protectedApi, '/perguntas');

    // Rotas da Resposta
    const Resposta = require('../api/Resposta/RespostaService');
    Resposta.register(protectedApi, '/respostas');

    // Rotas do Anexo
    const Anexo = require('../api/Anexo/AnexoService');
    Anexo.register(protectedApi, '/anexos');

    // Rotas da Disciplinas
    const Disciplinas = require('../api/disciplina/disciplinaService');
    Disciplinas.register(protectedApi, '/disciplinas');

    // Rotas do usuario
    const User = require('../api/user/userService');
    User.register(protectedApi, '/users');

    /*
    * Rotas abertas
    */
    const openApi = express.Router();
    server.use('/oapi', openApi);

    const AuthService = require('../api/user/AuthService');
    
    openApi.post('/login', AuthService.login);
    openApi.post('/signup', AuthService.signup);
    openApi.post('/validateToken', AuthService.validateToken);
}   