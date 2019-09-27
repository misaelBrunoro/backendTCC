const Resposta = require('./resposta');
const errorHandler = require('../common/errorHandler');

Resposta.methods(['get', 'post', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});
Resposta.after('post', errorHandler).after('put', errorHandler);

module.exports = Resposta;