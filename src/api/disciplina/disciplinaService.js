const Disciplina = require('./disciplina');
const errorHandler = require('../common/errorHandler');

Disciplina.methods(['get', 'post', 'put', 'delete']);
Disciplina.updateOptions({new: true, runValidators: true});
Disciplina.after('post', errorHandler).after('put', errorHandler);

module.exports = Disciplina;