const { func } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const brandSchema = new Schema(
  {
    name: { type: String, required: [true, "Brand Name is required!"] },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    mediaLink: { type: String, required: true },
    status: {
      type: Number,
      default: 1,
    },
  },
  // { timestamps: true, versionKey: false },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
brandSchema.virtual("newName").get(function () {
  return this.name + " " + this.name;
});

const Brand = mongoose.model("brand", brandSchema);

module.exports = Brand;
