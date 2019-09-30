const Pergunta = require('./pergunta');
const paginate = require('jw-paginate');

const errorHandler = require('../common/errorHandler');

Pergunta.methods(['get', 'post', 'put', 'delete']);
Pergunta.updateOptions({new: true, runValidators: true});
Pergunta.after('post', errorHandler).after('put', errorHandler);

Pergunta.route('pagination', (req, res, next) => {
    Pergunta.find()
            .populate('disciplina usuario')
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    // Paginação
                    const items = value;

                    const page = parseInt(req.query.page) || 1;
                    
                    const pageSize = 5;
  
                    const pager = paginate(items.length, page, pageSize);

                    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

                    return res.json({pager, pageOfItems});
                }
    });
});

module.exports = Pergunta;