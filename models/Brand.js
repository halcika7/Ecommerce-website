const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: [
        {
            id: {
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ]
});

module.exports = User = mongoose.model('brands', BrandSchema);