import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto, { randomBytes } from "crypto";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false, //isese apne jab user ko acces karenghe toh by default nhi milgha
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  }, // yh dono chiz razorpay mein use hoga
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId, // iska matlab id aayeghi or wo ref se aauyegha
        ref: "Course", // Course.js mein se id dudnde gha
      },
      poster: String,
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String, // forget password jab karenghe wo jo email aayegha usko yha save karenghe
  resetPasswordExpire: String, // or uska hee expiry date
});
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar passowrd change nhi hai toh return kardega
  this.password = await bcrypt.hash(this.password, 10); // agar hai toh hash kardega hai
  next();
});

schema.methods.getJWToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex"); // isko hee apne ko email tk pechana hai
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .toString("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

// console.log(crypto.randomBytes(20).toString("hex"));

schema.methods.comparePassword = async function (password) {
  // console.log(this.password);
  return await bcrypt.compare(password, this.password); // sada wala password matlab jab apne login kiye wo or yh this wla jo database mein hash hua hoga wo wala hai
};
export const User = mongoose.model("User", schema);
