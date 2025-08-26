//import some libraries and functions
import logger from "../../logger/logger.js";
import emailVerificationModel from "../../models/authModels/emailVerification.js";
import registrationModel from "../../models/authModels/registeration.js";
import bcrypt from "bcryptjs";

//create service function
const resetPasswordService=async(req,res)=>{
    // create some variables for taking user input from frontend
    const {email,otp,newPassword}=req.body;

    //use try catch for handling the error
    try{
    //checking email is verified or not
    const emailVerification=await emailVerificationModel.findOne({email});

    //checking conditions
    if(emailVerification.isVerified==true){
        logger.warn("Email already verified");
        return;
    }
    if(emailVerification.otp!=otp){
        logger.warn("Invalid OTP");
        return;
    }
    if(emailVerification.otpExpire<Date()){
        logger.warn("OTP Expired");
        return;
    }
    
    //checking user are exist ar not
    const existingUser=await registrationModel.findOne({email});
    if(!existingUser){
        logger.warn("User Not Found");
        return;
    }

    //hashing the password
    const hashedPassword=await bcrypt.hash(newPassword,10);

    //update the user
    existingUser.password=hashedPassword;
    existingUser.save();

    //update email Verfication
    emailVerification.otpVerify=true;
    emailVerification.otp=null;
    emailVerification.otpExpired=null;
    await emailVerification.save();

    //send message
    logger.info("Password Successfully reset");
    res.status(200).json({status:true,message:"Password Successfully reset"});
    }catch(err){
        logger.info("Password Not reset " + err.message);
        res.status(500).json({status:false,message:"Password Not reset"});
    }
}
//export the functions or class for using functionality globally
export default resetPasswordService;