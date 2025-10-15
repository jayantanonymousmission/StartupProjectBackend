//import some libraries and functions
import express from "express";
import generateTicket from "../../controllers/tickets_controller/generate_ticket.js";
import tokenVerification from "../../middlewares/authMiddlwares/tokenverification.js";
import roleVerification from "../../middlewares/authMiddlwares/roleVerification.js";
import updateTicket from "../../controllers/tickets_controller/updateTicket.js";
import statusUpdate from "../../controllers/statusUpdate/statusUpdate.js";
import deleteTicket from "../../controllers/tickets_controller/deleteTicket.js";

//create instance of the express Router
const router=express.Router();

//post requests
router.post("/generateTicket",tokenVerification,generateTicket);

//put request
router.put("/updateTicket",tokenVerification,updateTicket);
router.put("/statusUpdate",tokenVerification,roleVerification("superAdmin","admin","employee"),statusUpdate);

//delete request
router.delete("/deleteTicket",tokenVerification,deleteTicket);

//export the functions or class for using functionality globally
export default router;