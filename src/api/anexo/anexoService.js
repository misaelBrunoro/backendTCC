const Anexo = require('./anexo');
const errorHandler = require('../common/errorHandler');

Anexo.methods(['get', 'post', 'put', 'delete']);
Anexo.updateOptions({new: true, runValidators: true});
Anexo.after('post', errorHandler).after('put', errorHandler);

module.exports = Anexo;