//import some libraries and functions
import express from "express";
import roleVerification from "../../middlewares/authMiddlwares/roleVerification.js";
import tokenVerification from "../../middlewares/authMiddlwares/tokenverification.js";
import updateRole from "../../controllers/roleUpdate/roleUpdate.js";

//create instance of the express Router
const router=express.Router();

//put Request for updating role
router.put("/updateRole",tokenVerification,roleVerification("superAdmin","admin","employee"),updateRole);

//export the functions or class for using functionality globally
export default router;