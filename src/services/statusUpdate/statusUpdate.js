//import some libraries and files
import ticketModel from "../../models/ticket_operations/generate_ticket.js";
import registrationModel from "../../models/authModels/registeration.js";
import logger from "../../logger/logger.js";

//create a function for count total numbers of Admin in database
const statusUpdate = async (req, res) => {
    //use exception handling for handling the errors
    try {
        // create some variables
        const id = req.userId;
        const {
            ticket_id,
            status,
        } = req.body;
        //checking user is exist or not
        const existingUser = await registrationModel.findById(id);

        //checking conditions
        if (!existingUser) {
            logger.warn("User Not Found");
            return res.status(400).json({ status:false, message: "User Not Found" });
        }

        //checking ticket is exist or not
        const ticket = await ticketModel.findOne({ created_by: id, ticket_id: ticket_id });

        //checking conditions
        if (!ticket) {
            logger.warn("Ticket Not Found or Invalid Ticket ID");
            return res.status(400).json({ status: false, message: "Ticket Not Found or Invalid Ticket ID" });
        }

        //object ke andar dusre object ko override kar dena
        Object.assign(ticket, {
           status
        });

        //save the ticket
        await ticket.save();

        // send response
        logger.info("Status Successfully Updated");
        return res.status(200).json({ status: true, message: "Status Successfully Updated", ticket });
    }
    catch (err) {
        logger.error("Something went wrong in Updating Status");
        return res.status(500).json({ status: false, message: "Something went wrong in Updating Status" });
    }
}

//export the functions or class for using functionality globally
export default statusUpdate; 