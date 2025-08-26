//import some libraries and functions
import otpModel from  "../../models/authModels/emailVerification.js";
import logger from "../../logger/logger.js";

//create service function
const otpVerifyService=async(req,res)=>{

    //taking or test mail from user
    const {email,otp}=req.body;

    //use try catch for handling exceptions
    try{
    //check its exist or not
    const existingMail=await otpModel.findOne({email});

    //checking conditions if user email already exists
    if(!existingMail){
        logger.warn("Email not exist");
        return;
    }
    if (existingMail.otpExpired < Date.now()){
        logger.warn("OTP Expired");
        return;
    }
    if(existingMail.otpVerify){
        logger.warn("User already verified");
        return;
    }
    if(existingMail.otp != otp){
        logger.warn("Invalid OTP");
        return;
    }

    //update database
    existingMail.otpVerify=true;
    existingMail.otp=null;
    existingMail.otpExpired=null;

    //update the database
    await existingMail.save();
    //give message
    logger.info("Email Verified");
     res.status(200).json({status:true,message:"Email Verified"});

    }catch(err){
        logger.error("Email Not Verified"+err.message);
         res.status(500).json({status:false,message:"Email Not Verified"});
    }
}
//export the functions or class for using functionality globally
export default otpVerifyService;