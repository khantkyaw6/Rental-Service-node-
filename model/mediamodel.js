const mongoose = require("mongoose");
const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    mediaLink: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Media = mongoose.model("media", mediaSchema);

module.exports = Media;
