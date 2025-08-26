//import some libraries and functions
import rateLimit from "express-rate-limit";

// OTP limit
const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 10 minutes
  max: 3,
  message: "Too many OTP requests, please try again later.",
});

//export the functions or class for using functionality globally
export default otpLimiter;