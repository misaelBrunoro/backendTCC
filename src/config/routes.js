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
    const Pergunta = require('../api/pergunta/perguntaService');
    Pergunta.register(protectedApi, '/perguntas');

    // Rotas da Resposta
    const Resposta = require('../api/resposta/respostaService');
    Resposta.register(protectedApi, '/respostas');

    // Rotas da Disciplina
    const Disciplina = require('../api/disciplina/disciplinaService');
    Disciplina.register(protectedApi, '/disciplinas');

    // Rotas do Usuario
    const User = require('../api/user/userService');
    User.register(protectedApi, '/users');

    // Rotas do Comentario
    const Comentario = require('../api/comentario/comentarioService');
    Comentario.register(protectedApi, '/comentarios');
    
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