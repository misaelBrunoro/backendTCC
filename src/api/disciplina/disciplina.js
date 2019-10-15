const restful = require('node-restful');
const mongoose = restful.mongoose;

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = restful.model('Disciplina', disciplinaSchema);