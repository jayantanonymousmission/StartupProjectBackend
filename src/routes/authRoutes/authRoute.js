//import some libraries and functions
import express from "express";
import sendOtp from "../../controllers/authController/sendOtp.js";
import resendOtp from "../../controllers/authController/resendOtp.js";
import verifyOtp from "../../controllers/authController/verifyOtp.js";
import register from "../../controllers/authController/register.js";
import login from "../../controllers/authController/login.js";
import forgotPassword from "../../controllers/authController/forgotPassword.js";
import resetPassword from "../../controllers/authController/resetPassword.js";
import validator from "../../storage/validators/validator.js";
import registrationValidation from "../../middlewares/validators/registrationValidation.js";
import otpLimit from "../../middlewares/rateLimiter/otpLimit.js";
import loginLimit from "../../middlewares/rateLimiter/loginLimit.js";

//create instance of the express Router
const router=express.Router();

//make requests
router.post("/sendOtp",otpLimit,sendOtp);
router.post("/resendOtp",otpLimit,resendOtp);
router.post("/verifyOtp",verifyOtp);
router.post("/register",registrationValidation,validator,register);
router.post("/login",loginLimit,login);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);

//export the functions or class for using functionality globally
export default router;