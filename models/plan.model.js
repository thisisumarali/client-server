import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business_type: { type: String, required: true },
  input_data: { type: Object, required: true },
  generated_plan: { type: Object, required: true },
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
