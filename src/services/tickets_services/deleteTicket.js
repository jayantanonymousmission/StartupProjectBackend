//import some libraries and files
import ticketModel from "../../models/ticket_operations/generate_ticket.js";
import registrationModel from "../../models/authModels/registeration.js";
import logger from "../../logger/logger.js";

//create a function for count total numbers of Admin in database
const deleteTickets = async (req, res) => {
    //use exception handling for handling the errors
    try {
        // create some variables
        const id = req.userId;
        const {ticket_id} = req.body;
        //checking user is exist or not
        const existingUser = await registrationModel.findById(id);

        //checking conditions
        if (!existingUser) {
            logger.warn("User Not Found");
            return res.status(400).json({ status: true, message: "User Not Found" });
        }

        //checking ticket is exist or not
        const ticket = await ticketModel.findOneAndDelete({created_by: id, ticket_id: ticket_id });
        console.log(ticket);
        //checking conditions
        if (!ticket) {
            logger.warn("Ticket Not Deleted");
            return res.status(400).json({ status: false, message: "Ticket Not Deleted" });
        }

        // send response
        logger.info("Tickets Successfully Deleted");
        return res.status(200).json({ status: true, message: "Tickets Successfully Deleted"});
    }
    catch (err) {
        logger.error("Something went wrong in Deleting Ticket");
        return res.status(500).json({ status: false, message: "Something went wrong in Deleting Ticket" });
    }
}

//export the functions or class for using functionality globally
export default deleteTickets; 