const Resposta = require('./user');

Resposta.methods(['get', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});

module.exports = Resposta;