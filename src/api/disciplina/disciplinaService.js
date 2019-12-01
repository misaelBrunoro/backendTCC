const Disciplina = require('./disciplina');
const errorHandler = require('../common/errorHandler');

Disciplina.methods(['get', 'post', 'put', 'delete']);
Disciplina.updateOptions({new: true, runValidators: true});
Disciplina.after('post', errorHandler).after('put', errorHandler);

Disciplina.route('editar_disciplina.put', (req, res, next) => { 
    Disciplina.updateOne({_id: req.query.id}, { nome: req.body.nome }, function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        }
        return res.json(value);
    });
});

module.exports = Disciplina;