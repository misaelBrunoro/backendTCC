const restful = require('node-restful');
const mongoose = restful.mongoose;

const perguntaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    titulo: { type: String, require: true },
    descricao: { type: String, require: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', require: true},
    resolvido: { type: Boolean, require: true, default: false },
    anexo: { type: mongoose.Schema.Types.ObjectId, ref: 'Anexo' },
    resposta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resposta'}],
    createdAt: { type: Date, require: true, default: Date.now }
});

perguntaSchema.index({titulo: 'text', descricao: "text" });

module.exports = restful.model('Pergunta', perguntaSchema);