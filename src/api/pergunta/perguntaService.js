const Pergunta = require('./pergunta');

const errorHandler = require('../common/errorHandler');

Pergunta.methods(['get', 'post', 'put', 'delete']);
Pergunta.updateOptions({new: true, runValidators: true});
Pergunta.after('post', errorHandler).after('put', errorHandler);

Pergunta.route('count', (req, res, next) => {
    Pergunta.count((error, value) => {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            res.json({value});
        }
    });
});

Pergunta.route('page.get', (req, res, next) => {
    //var skip = req.params.skip;
    //var limit = req.params.limit;
    Pergunta.find()
            .populate('disciplina resposta anexo')
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    res.json({value});
                }
            });
}) 

module.exports = Pergunta;