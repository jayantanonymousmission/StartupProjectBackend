//import some libraries and functions
import bcrypt from "bcryptjs";
import variables from "../../storage/env/envConstants.js";
import registrationModel from "../../models/authModels/registeration.js";
import emailVerificationModel from "../../models/authModels/emailVerification.js";
import logger from "../../logger/logger.js";

//create service function
const registerService=async(req,res)=>{
    //take input data from user
    const {name,password,gender,address,role,code}=req.body;

    //use try catch for handling exceptions
    try{
        //create let variables
        let userRole="customer";

        //checking user verify or not
        const verifiedUser=await emailVerificationModel.findOne({otpVerify:true}).sort({updatedAt:-1});
        
        //create const variables for email because its takes email from otp verification model and put into registration model
        const email=verifiedUser.email;
        
        //checking conditions
        if(!verifiedUser && !verifiedUser.otpVerify==true){
            logger.warn("Email Not Verified");
            return;
        }
        
        //checking user registered or not
        const registeredUser=await registrationModel.findOne({email}).sort({updatedAt:-1});
        if(registeredUser){
            logger.error("User already Registered");
            return;
        }

        //checking condition for user are authorize or not
        //for super admin
        if(role == "superAdmin"){
            if(code == variables.superAdminCode){
                userRole='superAdmin';
            }
        }
        //for admin
        if(role == "admin"){
            if(code == variables.adminCode){
                userRole='admin';
            }
        }
        //for employee
        if(role == "employee"){
            if(code == variables.employeeCode){
                userRole='employee';
            }
        }
        //for worker
        if(role == "worker"){
            if(code == variables.workerCode){
                userRole='worker';
            }
        }

        //now hash the password
        const hashedPassword=await bcrypt.hash(password,10);
        if(!hashedPassword){
            logger.warn("Password are not Encrypted");
            return;
        }

        //put values in model
        const newUser=registrationModel({
            name,
            email,
            password:hashedPassword,
            gender,
            address,
            role:userRole,
        });

        //save the data into database
        await newUser.save();

        //give message
        logger.info("Successfully Registered");
        res.status(200).json({status:true,message:"Successfully Registered"});
    }catch(err){
        logger.error("Registered Failed"+err.message);
        res.status(500).json({status:false,message:"Registration Failed"});
    }
}

//export the functions or class for using functionality globally
export default registerService;