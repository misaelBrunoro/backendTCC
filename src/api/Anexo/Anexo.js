const restful = require('node-restful');
const mongoose = restful.mongoose;

const anexoSchema = new mongoose.Schema({
    caminhoStorage: { type: String, require: true },
    downloadURL: { type: String, require: true },
    createdAt: { type: Date, require: true, default: Date.now }
});

module.exports = restful.model('Anexo', anexoSchema);