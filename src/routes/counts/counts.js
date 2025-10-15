//import some libraries and functions
import express from "express";
import totalCustomers from "../../controllers/counts/totalNumberOfRoles/totalCustomers.js";
import totalAdmins from "../../controllers/counts/totalNumberOfRoles/totalAdmins.js";
import totalEmployees from "../../controllers/counts/totalNumberOfRoles/totalEmployees.js";
import totalWorkers from "../../controllers/counts/totalNumberOfRoles/totalWorkers.js";

import tokenVerification from "../../middlewares/authMiddlwares/tokenverification.js";

import totalNumberOfTickets from "../../controllers/counts/tickets/totalNumberOfTickets.js";
import recentlyRoleBasedTickets from "../../controllers/counts/tickets/recentlyRoleBasedTickets.js";

import totalNumberOfStatus from "../../controllers/counts/numberOfStatus/statusCount.js";

//create instance of the express Router
const router=express.Router();

//Get Request of Total Number of Roles
router.get("/totalCustomers",totalCustomers);
router.get("/totalAdmins",totalAdmins);
router.get("/totalEmployees",totalEmployees);
router.get("/totalWorkers",totalWorkers);

//Get request of Total Number of Tickets
router.get("/totalTickets/:role",totalNumberOfTickets);

//recently role based tickets
router.get("/recentlyRoleBasedTickets",tokenVerification,recentlyRoleBasedTickets);

//total number of status
router.get("/totalNumberOfStatus",tokenVerification,totalNumberOfStatus);

//export the functions or class for using functionality globally
export default router;