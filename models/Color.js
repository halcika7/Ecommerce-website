const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('colors', ColorSchema);