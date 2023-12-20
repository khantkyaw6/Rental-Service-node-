const mongoose = require("mongoose");
const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     city: { type: String, required: true },
//   },
//   { timestamps: true, versionKey: false }
// );

// const User = mongoose.model("user", userSchema);

// module.exports = User;
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      required: [true, "first name is required!"],
      min: [5, "firstname i min 5."],
    },
    lastname: {
      type: String,
      lowercase: true,
      text: true,
      trim: true,
      required: true,
    },
    middlename: {
      type: String,
      text: true,
      trim: true,
      lowercase: true,
    },
    slug: { type: String, text: true, trim: true, lowercase: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.virtual("fullName").get(function () {
  return this.firstname + " " + this.middlename + " " + this.lastname;
});

//document middleware
UserSchema.pre("save", function (next) {
  this.slug = this.firstname + "-" + this.middlename + "-" + this.lastname;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
