const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  permission: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = Permission = mongoose.model("permissions", PermissionSchema);
