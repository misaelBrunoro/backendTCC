const restful = require('node-restful');
const mongoose = restful.mongoose;

const respostaSchema = new mongoose.Schema({
    descricao: { type: String },
    anexo: { type: mongoose.Schema.Types.ObjectId, ref: 'Anexo'},
    createdAt: { type: Date, require: true, default: Date.now }
});

module.exports = restful.model('Resposta', respostaSchema);