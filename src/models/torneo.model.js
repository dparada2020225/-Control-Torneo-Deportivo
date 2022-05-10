const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorneoSchema = Schema({
    nombre: String,
});

module.exports = mongoose.model('Torneos', TorneoSchema);