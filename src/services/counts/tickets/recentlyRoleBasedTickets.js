import ticketModel from "../../../models/ticket_operations/generate_ticket.js";
import registerationModel from "../../../models/authModels/registeration.js";
import logger from "../../../logger/logger.js";

const totalNumberOfTickets = async (req, res) => {
  try {
    const loggedInUserId = req.userId;    // token se
    const loggedInRole = req.role;        // token/middleware se
    const targetRole = req.params.role;   // URL se (e.g. employee, worker, etc.)

    // 🔹 Access hierarchy map
    const accessMap = {
      superAdmin: ["admin", "employee", "worker", "customer"],
      admin: ["admin","employee", "worker", "customer"],
      employee: ["employee","worker", "customer"],
      worker: ["worker"],
      customer: ["customer"],
    };

    const allowedRoles = accessMap[loggedInRole] || [];
    const formattedRole =targetRole.charAt(0) + targetRole.slice(1);

    // 🔒 Check if the logged-in user can access this role’s tickets
    if (!allowedRoles.includes(formattedRole) && formattedRole !== loggedInRole) {
      return res.status(403).json({
        status: false,
        message: `${loggedInRole} cannot view ${formattedRole} tickets`,
      });
    }

    let filter = {};

    // 🧠 Case 1: User viewing own tickets
    if (formattedRole === loggedInRole) {
      filter = { created_by: loggedInUserId };
    }
    // 🧠 Case 2: Viewing other role’s tickets
    else {
      // sab users jinka role targetRole hai
      const targetUsers = await registerationModel
        .find({ role: formattedRole })
        .select("_id");

      const targetIds = targetUsers.map((u) => u._id);

      // Agar employee worker tickets dekh raha hai => sirf apne under ke workers
      if (loggedInRole === "Employee" && formattedRole === "Worker") {
        filter = {
          created_by: { $in: targetIds },
          assigned_to: loggedInUserId, // sirf uske under ke worker tickets
        };
      } else {
        filter = { created_by: { $in: targetIds } };
      }
    }

    // 🔹 Get recent 5 tickets
    const recentlyTickets = await ticketModel
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      status: true,
      message: `Recent ${formattedRole} tickets fetched successfully for ${loggedInRole}`,
      recentlyTickets,
    });
  } catch (err) {
    logger.error("Error fetching tickets: " + err.message);
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong", error: err.message });
  }
};

export default totalNumberOfTickets;
