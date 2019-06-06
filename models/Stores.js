const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoresSchema = new Schema({
	address: {
		type: String,
		required: true,
		unique: true
    },
    picture: {
        type: String,
        required: true
    },
	city: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
    },
    location: {},
    weekHours: {
        from: String,
        to: String
    },
    saturdayHours: {
        from: String,
        to: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    links: {}
});

module.exports = Stores = mongoose.model('stores', StoresSchema);
