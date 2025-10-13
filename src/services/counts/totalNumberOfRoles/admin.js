//import some libraries and files
import registrationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of Admin in database
const totalAdmins=async (req,res)=>{
    //use exception handling for handling the errors
    try{
        //count Admin using countDocument function 
        const countAdmins=await registrationModel.countDocuments({role:"admin"});

        //checking conditions
        if(countAdmins){
            logger.info(`Total number of Admins:${countAdmins}`);
            return res.status(200).json({status:true,message:"Total Number of Admins are:",countAdmins});
        }
        else{
            logger.info("Admins Not Found");
            return res.status(400).json({status:false,message:"Admins Not Found"});
        }
    }
    catch(error){
        res.status(500).json({status:false,message:"Something went wrong in total Admins"});
        return;
    }
}

//export the functions or class for using functionality globally
export default totalAdmins; 