//import some libraries and functions
import mongoose from "mongoose";

//make schema
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [1, "At least 1 character is required"],
    maxlength: [30, "Maximum 30 characters allowed"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    minlength: [6, "At least 6 characters required including lowercase, uppercase, special character or digit"],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: "male",
  },
  address: {
    type: String,
    minlength: [5, "At least 5 characters are required"],
    maxlength: [50, "Maximum 50 characters allowed"],
  },
  role: {
    type: String,
    required: true,
    enum: ["superAdmin", "admin", "employee", "worker", "customer"],
    default: "customer",
  },
  token:{
    type:String,
  }
}, { timestamps: true });

//export the functions or class for using functionality globally
export default mongoose.model("Registration", registrationSchema, "Registration");