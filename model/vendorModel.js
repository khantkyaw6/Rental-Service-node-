const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true, versionKey: false }
);

const Vendor = mongoose.model("vendor", vendorSchema);

module.exports = Vendor;
