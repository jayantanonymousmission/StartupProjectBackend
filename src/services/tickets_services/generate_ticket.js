import generateTicketModel from "../../models/ticket_operations/generate_ticket.js";
import registrationModel from "../../models/authModels/registeration.js";
import logger from "../../logger/logger.js";

const generateTicketService = async (req, res) => {
  const {
    mobile_number,
    complaint_date,
    product_number,
    product_name,
    complaint_level,
    status,
    category_type,
    complaint_title,
    complaint_description,
    product_image,
    comment,
  } = req.body;
  const role = req.user.role;

  try {
    const user = await registrationModel.findById(req.user._id);
    if (!user) {
      logger.warn("User not found");
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (role === "superAdmin") {
      logger.warn("Super Admin cannot create tickets");
      return res.status(403).json({ status: false, message: "Super Admin cannot create tickets" });
    }

    let assigned_employee = null;
    let assigned_admin = null;
    let assigned_superAdmin = null;
    let customerId = null;

    if (role === "customer" || role === "worker") {
  // Find employee from DB who handles this customer
  const employee = await registrationModel.findOne({ role: "employee" });
  assigned_employee = employee?._id;
}

else if (role === "employee") {
  const admin = await registrationModel.findOne({ role: "admin" });
  assigned_admin = admin?._id;
}

else if (role === "admin") {
  const superAdmin = await registrationModel.findOne({ role: "superAdmin" });
  assigned_superAdmin = superAdmin?._id;
}


    // Create ticket
    const ticket = new generateTicketModel({
      ticket_id: "TCKT-" + Date.now(),
      created_by: user._id,
      customer: customerId,
      assigned_employee,
      assigned_admin,
      assigned_superAdmin,
      mobile_number,
      complaint_date: complaint_date || new Date(),
      product_number,
      product_name,
      complaint_level: complaint_level || "low",
      status: status || "open",
      category_type,
      complaint_title,
      complaint_description,
      product_image,
      comment,
    });
    await ticket.save();

    logger.info("Ticket Successfully Generated");
    return res.status(201).json({
      status: true,
      message: "Ticket Successfully Generated",
      ticket,
    });

  } catch (error) {
    logger.error("Error in ticket generation", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong in ticket generation",
    });
  }
};

export default generateTicketService;