const Resposta = require('./resposta');

Resposta.methods(['get', 'post', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});

module.exports = Resposta;