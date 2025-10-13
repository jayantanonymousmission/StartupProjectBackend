//import some libraries and files
import registrationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of Employee in database
const totalEmployees=async (req,res)=>{
    //use exception handling for handling the errors
    try{
        //count Employee using countDocument function 
        const countEmployees=await registrationModel.countDocuments({role:"employee"});

        //checking conditions
        if(countEmployees){
            logger.info(`Total number of Employees:${countEmployees}`);
            return res.status(200).json({status:true,message:"Total Number of Customer are:",countEmployees});
        }
        else{
            logger.info("Employees Not Found");
            return res.status(400).json({status:false,message:"Employees Not Found"});
        }
    }
    catch(error){
        res.status(500).json({status:false,message:"Something went wrong in total Employees"});
        return;
    }
}

//export the functions or class for using functionality globally
export default totalEmployees; 