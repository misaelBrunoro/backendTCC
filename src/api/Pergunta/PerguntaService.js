const Pergunta = require('./Pergunta');

Pergunta.methods(['get', 'post', 'put', 'delete']);
Pergunta.updateOptions({new: true, runValidators: true});

module.exports = Pergunta;