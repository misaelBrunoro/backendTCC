const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost/monitoriatcc', 
                                    { useNewUrlParser: true },  { useUnifiedTopology: true });
