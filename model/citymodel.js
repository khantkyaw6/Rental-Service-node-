const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    population: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const City = mongoose.model("city", modelSchema);

module.exports = City;
