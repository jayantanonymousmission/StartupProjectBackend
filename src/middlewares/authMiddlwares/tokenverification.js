//import some libraries and functions
import jwt from "jsonwebtoken";
import logger from "../../logger/logger.js";
import variables from "../../storage/env/envConstants.js";

//function for veify token
const tokenVerification = (req, res, next) => {
    //use try catch for handling errors 
    try {
        const token = req.headers.authorization?.split(" ")[1];
        //checking condition
        if (!token) {
            logger.warn("Token Not Found");
        }

        //token verify
        verifyToken = jwt.verify(token, variables.tokenKey);
        
        req.user = verifyToken;
        next();
    } catch (err) {
        logger.error("Something went wrong in token" + err.message);
        res.status(500).json({ status: true, message: "Something went wrong in token" });
    }
}

//export the functions or class for using functionality globally
export default tokenVerification;