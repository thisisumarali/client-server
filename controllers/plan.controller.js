import Plan from "../models/plan.model.js";
import { generateWebsitePlan } from "../services/ai.service.js";

const generate = async (req, res) => {
  try {
    const { businessType, description, targetAudience, features, budget } = req.body;

    if (!businessType || !description) {
      return res.status(400).json({ msg: "businessType and description are required" });
    }

    const input_data = { description, targetAudience, features, budget };
    const generated_plan = await generateWebsitePlan({ businessType, ...input_data });

    const plan = await Plan.create({
      user_id: req.userID,
      business_type: businessType,
      input_data,
      generated_plan,
    });

    return res.status(201).json({ msg: "Plan generated and saved", plan });
  } catch (error) {
    console.error("Error generating plan:", error);
    return res.status(500).json({ msg: "Failed to generate plan", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const plans = await Plan.find({ user_id: req.userID }).sort({ createdAt: -1 });
    return res.status(200).json({ msg: "Plans fetched", plans });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ msg: "Failed to fetch plans", error: error.message });
  }
};

export default { generate, getAll };