const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "admin" },
    permissions: { type: Array, required: true },
    authToken: { type: String, required: true },
    profile: { type: String, default: null },
  },
  { timestamps: true, versionKey: false }
);

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
