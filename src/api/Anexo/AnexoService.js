const Anexo = require('./anexo');

Anexo.methods(['get', 'post', 'put', 'delete']);
Anexo.updateOptions({new: true, runValidators: true});

module.exports = Anexo;