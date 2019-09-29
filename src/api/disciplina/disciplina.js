const restful = require('node-restful');
const mongoose = restful.mongoose;

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, require: true },
    createdAt: { type: Date, require: true, default: Date.now }
});

module.exports = restful.model('Disciplina', disciplinaSchema);