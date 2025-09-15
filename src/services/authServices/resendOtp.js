//import some libraries and functions
import sendEmail from "../../utils/emailVerification/emailverify.js";
import otpModel from  "../../models/authModels/emailVerification.js";
import logger from "../../logger/logger.js";
import repeatWords from "../../storage/constants/repeatWords.js";


//create service function
const resendOtpService=async(req,res)=>{
    const {otp,otpExpired} =repeatWords();
     //taking or test mail from user
    const {email}=req.body;

    //use try catch for handling exceptions
    try{
    //check its exist or not
    const existingMail=await otpModel.findOne({email});

    //checking conditions if user email already exists
    if(!existingMail){
        logger.warn("Email Not Found");
        res.status(400).json({status:false,message:"Email Not Found"});
        return;
    }
    if(!existingMail.otp){
        logger.warn("Otp not found!First request for otp");
        res.status(400).json({status:false,message:"OTP Not Found!First Request for OTP"});
        return;
    }
    
    //update data on database
        existingMail.otp=otp,
        existingMail.otpExpired=otpExpired,
        existingMail.otpVerify=false,

    //save data to database
    await existingMail.save();

    //send otp to Email
    await sendEmail(email,"Check Otp",`Your Otp is:${otp}`);

    //give message
    logger.info("OTP Resend Successfully");
     res.status(200).json({status:true,message:"OTP Resend Successfully"});

    }catch(err){
        logger.error("Resend OTP Failed"+err.message);
         res.status(500).json({status:false,message:"OTP Resend Failed"});
    }
}
//export the functions or class for using functionality globally
export default resendOtpService;