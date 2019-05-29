const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categories: [
    {
      type: String,
      required: true,
      index: true
    }
  ]
});

BrandSchema.index({
  '$**': 'text'
});

module.exports = Brand = mongoose.model("brands", BrandSchema);
