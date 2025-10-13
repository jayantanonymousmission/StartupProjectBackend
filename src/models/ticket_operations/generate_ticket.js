import mongoose from "mongoose";

const generate_ticket_schema = new mongoose.Schema({
  ticket_id: { type: String, required: true, unique: true },
  mobile_number: { type: Number },
  complaint_date: { type: Date, default: Date.now},
  product_number: { type: Number },
  product_name: { type: String },
  complaint_level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open"
  },
  category_type: {
    type: String,
    enum: ["delivery_issue", "product_defective", "warranty_claim", "service_request"]
  },
  complaint_title: { type: String, required: true },
  complaint_description: { type: String, required: true },
  product_image: { type: String },
  comment: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  assigned_admin: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  assigned_employee: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  assigned_superAdmin:{ type:mongoose.Schema.Types.ObjectId, ref:"Registration" },
}, { timestamps: true });

const model = mongoose.model("Generate_Tickets", generate_ticket_schema);
export default model;