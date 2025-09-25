//import some libraries and functions
import mongoose from "mongoose";

//make schema
const emailVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  otp: {
    type: Number,
  },
  otpExpired: {
    type:Date,
  },
  otpVerify: {
    type: Boolean,
    default:false,
  },
}, { timestamps: true });

//export the functions or class for using functionality globally
export default mongoose.model("EmailVerification", emailVerificationSchema, "EmailVerification");