//import some libraries and functions
import sendEmail from "../../utils/emailVerification/emailverify.js";
import otpModel from  "../../models/authModels/emailVerification.js";
import logger from "../../logger/logger.js";
import repeatWords from "../../storage/constants/repeatWords.js";

//create service function
const sendOtpService=async(req,res)=>{
    //taking or test mail from user
    const {email}=req.body;
    const {otp,otpExpired} =repeatWords();

    //use try catch for handling exceptions
    try{
    //check its exist or not
    const existingMail=await otpModel.findOne({email});

    //checking conditions if user email already exists
    if(existingMail){
        logger.warn("Email Already Exist");
        res.status(400).json({status:false,message:"Email Already Exist"});
        return;
    }

    //filling data into model
    const data=otpModel({
        email,
        otp,
        otpExpired,
        //isverify:false,
    });
    //save data to database
    await data.save();

    //send otp to Email
    await sendEmail(email,"Check Otp",`Your Otp is:${otp}`);

    //give message
    logger.info("OTP Send Successfully");
    res.status(200).json({status:true,message:"OTP Send Successfully"});
    }catch(err){
        logger.error("OTP Failed "+err.message);
        res.status(500).json({status:false,message:"OTP Failed"});
    }
}
//export the functions or class for using functionality globally
export default sendOtpService;