const restful = require('node-restful');
const mongoose = restful.mongoose;

const perguntaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    resolvido: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
    resposta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resposta'}]
});

perguntaSchema.index({titulo: 'text', descricao: "text" });

module.exports = restful.model('Pergunta', perguntaSchema);
