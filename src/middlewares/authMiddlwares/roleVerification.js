//import some libraries and functions
import logger from "../../logger/logger.js";

const authorizeRole=(...role)=>{
    return(req,res,next)=>{
        if (!req.user || !req.user.role) {
        logger.error("User not authenticated or role missing");
        return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        
        if(!role.includes(req.user.role)){
            logger.error("Access Denied");
        }
        next();
    }
};

//export the functions or class for using functionality globally
export default authorizeRole;