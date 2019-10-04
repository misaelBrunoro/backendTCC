const restful = require('node-restful');
const mongoose = restful.mongoose;

const perguntaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    titulo: { type: String, require: true },
    descricao: { type: String, require: true },
    resolvido: { type: Boolean, require: true, default: false },
    createdAt: { type: Date, require: true, default: Date.now },
    anexo: { type: mongoose.Schema.Types.ObjectId, ref: 'Anexo' },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', require: true},
    resposta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resposta'}]
    
});

perguntaSchema.index({titulo: 'text', descricao: "text" });

module.exports = restful.model('Pergunta', perguntaSchema);
