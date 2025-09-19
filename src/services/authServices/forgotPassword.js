//import some libraries and functions
import logger from "../../logger/logger.js";
import emailVerificationModel from "../../models/authModels/emailVerification.js";
import repeatWords from "../../storage/constants/repeatWords.js";
import sendEmail from "../../utils/emailVerification/emailverify.js";


//create service function
const forgotPasswordService=async(req,res)=>{
    //create variable for taking user input from frontend
    const {email}=req.body;
    const {otp,otpExpired}=repeatWords();

    //use try catch for handling exception
    try{
        //check email is verified or not
        const emailVerification=await emailVerificationModel.findOne({email});
        if(!emailVerification){
            logger.warn("Email Not Verified");
            res.status(400).json({status:false,message:"Email Not Verified"});
            return;
        }

       //update otp
       emailVerification.otp=otp;
       emailVerification.otpExpired=otpExpired;
       emailVerification.otpVerify=false;
       await emailVerification.save();
        
        logger.info("Password Forgoted");
        res.status(500).json({status:true,message:"Password Forgoted"});
        
        await sendEmail(email,"Check Otp",`Otp is:${otp}`);
    }catch(err){
        logger.error("Password Not Forgot!Enter valid Email Address"+err.message);
        res.status(500).json({status:false,message:"Password Not Forgot!Enter Valid Email Address"});
    }


}
//export the functions or class for using functionality globally
export default forgotPasswordService;