//import some libraries and files
import registrationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of customers in database
const totalCustomers=async (req,res)=>{
    //use exception handling for handling the errors
    try{
        //count customers using countDocument function 
        const countCustomers=await registrationModel.countDocuments({role:"customer"});

        //checking conditions
        if(countCustomers){
            logger.info(`Total number of customers:${countCustomers}`);
            return res.status(200).json({status:true,message:"Total Number of Customer are:",countCustomers});
        }
        else{
            logger.info("Customers Not Found");
            return res.status(400).json({status:false,message:"Customers Not Found"});
        }
    }
    catch(error){
        res.status(500).json({status:false,message:"Something went wrong in total customers"});
        return;
    }
}

//export the functions or class for using functionality globally
export default totalCustomers; 