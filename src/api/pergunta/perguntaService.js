const Pergunta = require('./pergunta');
const paginate = require('jw-paginate');

const errorHandler = require('../common/errorHandler');

Pergunta.methods(['get', 'post', 'put', 'delete']);
Pergunta.updateOptions({new: true, runValidators: true});
Pergunta.after('post', errorHandler).after('put', errorHandler);

Pergunta.route('pagination', (req, res, next) => {
    const filter = req.body || null;
    const page = parseInt(req.query.page) || 1;
    const query = {};

    if(filter.texto) {
        query.titulo = filter.texto;
        query.descricao = filter.texto;
    }
    if(filter.disciplina) {
        query.disciplina = filter.disciplina;
    }
    if(filter.dataPublicacao) {
        query.createdAt = filter.dataPublicacao;
    }
    console.log(query);

    Pergunta.find(query)
        .populate('disciplina usuario')
        .exec((error, value) => {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            return res.json(paginateItems(value, page));
        }
    });
});

function paginateItems(value, page) {
    // Paginação
    const items = value;
    
    const pageSize = 5;

    const pager = paginate(items.length, page, pageSize);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    return {pager, pageOfItems};
}

module.exports = Pergunta;