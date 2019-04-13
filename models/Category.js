const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true,
        unique: true
    },
    subcategories: [
        {
            name: {
                type: String,
                required: true,
                unique: true
            },
            subcategories: {
                type: Array,
                required: true
            }
        }
    ]
});

module.exports = Category = mongoose.model('category', CategorySchema);