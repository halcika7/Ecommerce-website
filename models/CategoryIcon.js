const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryIconSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = CategoryIcon = mongoose.model(
  "categoryicon",
  CategoryIconSchema
);
