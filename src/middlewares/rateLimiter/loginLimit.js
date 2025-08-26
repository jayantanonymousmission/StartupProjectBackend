//import some libraries and functions
import rateLimit from "express-rate-limit"

// Login limit
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts, slow down!",
});

//export the functions or class for using functionality globally
export default loginLimiter;