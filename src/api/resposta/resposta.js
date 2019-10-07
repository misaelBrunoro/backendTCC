const restful = require('node-restful');
const mongoose = restful.mongoose;

const respostaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    descricao: { type: String, require: true },
    oficial: { type: Boolean, require: true, default: false },
    createdAt: { type: Date, require: true, default: Date.now }
});

module.exports = restful.model('Resposta', respostaSchema);