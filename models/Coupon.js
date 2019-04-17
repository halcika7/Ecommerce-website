const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  couponType: {
    type: String,
    required: true,
    default: "Percent"
  },
  value: {
    type: Number,
    required: true
  },
  exparationDate: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports = User = mongoose.model("coupons", CouponSchema);
