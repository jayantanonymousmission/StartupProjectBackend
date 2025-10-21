//import some libraries and files
import registrationModel from "../../models/authModels/registeration.js";
import logger from "../../logger/logger.js";

//create a function for role update
const updateTickets = async (req, res) => {
    //use exception handling for handling the errors
    try {
        // create some variables
        const { id, role } = req.body


        //checking user is exist or not
        const existingUser = await registrationModel.findById(id);

        //checking conditions
        if (!existingUser) {
            logger.warn("User Not Found");
            return res.status(400).json({ status: false, message: "User Not Found" });
        }

        if (req.user.role != "employee" && req.user.role == 'admin' && req.user.role != "superAdmin") {
            logger.warn("Only Employee,Admin,and Super Admin can update Role");
            return res.status(400).json({ status: false, message: "Only Employee,Admin,and Super Admin can update Role" });
        }
        if (req.user._id.toString() === id) {
            logger.warn("Cannot update your own role");
            return res.status(400).json({ status: false, message: "Cannot update your own role" });
        }

        //object ke andar dusre object ko override kar dena
        Object.assign(existingUser, { role });

        //save the role
        await existingUser.save();

        // send response
        logger.info("Role Successfully Updated");
        return res.status(200).json({ status: true, message: "Role Successfully Updated", existingUser });
    }
    catch (err) {
        logger.error("Something went wrong in Updating Role");
        return res.status(500).json({ status: false, message: "Something went wrong in Updating Role" });
    }
}

//export the functions or class for using functionality globally
export default updateTickets; 