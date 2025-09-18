//import some libraries and functions
import registrationModel from '../../models/authModels/registeration.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logger from '../../logger/logger.js';
import variables from '../../storage/env/envConstants.js';

//create service function
const loginService=async(req,res)=>{
    //create two variables for taking user input from frontend using req.body
    const {email,password}=req.body;

    //use try catch for handling exceptions
    try{
        //check user exist or not
        const existingUser=await registrationModel.findOne({email});

        //checking conditions
        if(!existingUser){
            logger.warn("User Not Found");
            res.status(400).json({status:false,message:"User Not Found"});
            return;
        }
        //verify password
        const verifyPassword=await bcrypt.compare(password,existingUser.password);
        if(!verifyPassword){
            logger.warn("Invalid Credentials");
            res.status(400).json({status:false,message:"Invalid Credentials"});
            return;
        }

        //User Login though token(for generating token we use sign method)
        const token=jwt.sign(
            {
                id:existingUser._id,
                email:existingUser.email,
                password:existingUser.password,
                role:existingUser.role,
            },
            variables.tokenKey,
            {expiresIn:"100d"}
        );
        //save the token
        existingUser.token=token;
        await existingUser.save();

        //give message
        logger.info("Login Successfully");
        res.status(200).json({status:true,message:"Login Successfully",role:existingUser.role,email:existingUser.email});

    }catch(err){
        logger.error("Login Failed"+err.message);
        res.status(500).json({status:false,message:"Login Failed"});
    }

}
//export the functions or class for using functionality globally
export default loginService;