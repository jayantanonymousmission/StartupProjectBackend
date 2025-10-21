//import some libraries and files
import logger from "../../logger/logger.js";

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    // Check if req.user and req.user.role exist
    if (!req.user || !req.user.role) {
      logger.error("User not authenticated or role missing");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated or role missing",
      });
    }

    // Check if user has one of the allowed roles
    if (!roles.includes(req.user.role)) {
      logger.error(`Access Denied for role: ${req.user.role}`);
      return res.status(403).json({
        success: false,
        message: `Access Denied: ${req.user.role} cannot access this resource`,
      });
    }

    // Role is allowed
    next();
  };
};

export default authorizeRole;
