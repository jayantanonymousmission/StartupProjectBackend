//import some libraries and files//import some libraries and files
import ticketModel from "../../../models/ticket_operations/generate_ticket.js";
import registerationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

//create a function for count total numbers of Admin in database
const totalNumberOfTickets = async (req, res) => {
    //use exception handling for handling the errors
    try {
        const roleName = req.params.role;

        // Step 1: Find all users with that role
        const users = await registerationModel.find({ role: roleName }, { _id: 1 });

        // Step 2: Extract their IDs
        const userIds = users.map(user => user._id);

        // Step 3: Count tickets where created_by matches any of those IDs
        const count = await ticketModel.countDocuments({created_by: { $in: userIds } });

        // send response
        logger.info("Tickets successfully fetched");
        return res.status(200).json({status:true,message:"Tickets Successfully Fetched",role:roleName, totalTickets: count });
    } catch (err) {
        logger.error("Something went wrong in ticket fetching");
        return res.status(200).json({status:true,message:"Something went wrong in ticket fetching",recentlyTickets});
    }
}

//export the functions or class for using functionality globally
export default totalNumberOfTickets; 