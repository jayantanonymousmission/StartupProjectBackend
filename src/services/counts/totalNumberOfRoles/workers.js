//import some libraries and files
import registrationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of Workers in database
const totalWorkers=async (req,res)=>{
    //use exception handling for handling the errors
    try{
        //count Workers using countDocument function 
        const countWorkers=await registrationModel.countDocuments({role:"worker"});

        //checking conditions
        if(countWorkers){
            logger.info(`Total number of Workers:${countWorkers}`);
            return res.status(200).json({status:true,message:"Total Number of Customer are:",countWorkers});
        }
        else{
            logger.info("Workers Not Found");
            return res.status(400).json({status:false,message:"Workers Not Found"});
        }
    }
    catch(error){
        res.status(500).json({status:false,message:"Something went wrong in total Workers"});
        return;
    }
}

//export the functions or class for using functionality globally
export default totalWorkers; 