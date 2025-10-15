//import some libraries and files//import some libraries and files
import ticketModel from "../../../models/ticket_operations/generate_ticket.js";
import registerationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of role based tickets

const totalNumberOfTickets = async (req, res) => {
    //use exception handling for handling the errors
    try {
        const id=req.userId;
        
        //get id of login user
        const users = await registerationModel.findById(id);

        //checking conditions
        if(!users){
            logger.warn("User Not Found");
            return res.status(400).json({status:false,message:"User Not Found"});
        }

        //count total number of tickets of all tickets
        const count=await ticketModel.aggregate([
            {$match:{created_by:id}},
            {$group:{
                _id:"$status",
                count:{$sum:1}
            }}
        ]);

        //send response
        logger.info("Total Number of Status Count");
        return res.status(200).json({status:true,message:"Total Number of Status Count",count});
    } catch (err) {
        logger.error("Something went wrong in number of Status Count")
        return res.status(500).json({status:false,message:"Some went wrong in number of Status Count"});
    }
}

//export the functions or class for using functionality globally
export default totalNumberOfTickets; 
