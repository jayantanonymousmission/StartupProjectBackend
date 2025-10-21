import jwt from "jsonwebtoken";
import logger from "../../logger/logger.js";
import variables from "../../storage/env/envConstants.js";
import registrationModel from "../../models/authModels/registeration.js";

const tokenVerification = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      logger.warn("Token Not Found");
      return res.status(401).json({ status: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, variables.tokenKey);

    const user = await registrationModel.findById(decoded.id); // ✅ Fetch full user
    if (!user) {
      logger.warn("User not found");
      return res.status(404).json({ status: false, message: "User not found" });
    }

    req.user = user;
    req.userId=user._id;
    req.role=user.role;
    next();
  } catch (err) {
    logger.error("Something went wrong in token: " + err.message);
    res.status(500).json({ status: false, message: "Something went wrong in token" });
  }
};

export default tokenVerification;