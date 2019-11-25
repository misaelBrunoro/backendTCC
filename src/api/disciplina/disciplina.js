const restful = require('node-restful');
const mongoose = restful.mongoose;

const disciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    createdAt: { type: Date, required: true, default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()) }
});

module.exports = restful.model('Disciplina', disciplinaSchema);