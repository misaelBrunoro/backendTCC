const Resposta = require('./Resposta');

Resposta.methods(['get', 'post', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});

module.exports = Resposta;