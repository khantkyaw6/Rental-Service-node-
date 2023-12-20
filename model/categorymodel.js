const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    mediaLink: { type: String, required: true },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
