//import some libraries and files//import some libraries and files
import ticketModel from "../../../models/ticket_operations/generate_ticket.js";
import registerationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of Admin in database
const totalNumberOfTickets = async (req, res) => {
    //use exception handling for handling the errors
    try {
        const id=req.userId;

        // Step 1: Find all users with that role
        const users = await registerationModel.find({_id:id});

        //checking conditions
        if(!users){
            logger.warn("User Not Found");
            return res.status(400).json({status:false,message:"User Not Found"});
        }

        //find id in ticket data
        const recentlyTickets = await ticketModel.find({created_by:id}).sort({createdAt:-1}).limit(5);

        //send response
        logger.info("Ticket Successfully fetched");
        return res.status(200).json({status:true,message:"Ticket Successfully fetched",recentlyTickets});
    } catch (err) {
        logger.error("Something went wrong in recently tickets")
        return res.status(500).json({status:false,message:"Some went wrong in recently tickets"});
    }
}

//export the functions or class for using functionality globally
export default totalNumberOfTickets; 