import { openai } from "../utils/openai.js";

export const generateWebsitePlan = async ({ businessType, description, targetAudience, features, budget }) => {
  const prompt = `Act like a senior web strategist. Generate a complete website plan in JSON format only.

Client Brief:
- Business Type: ${businessType}
- Description: ${description}
- Target Audience: ${targetAudience}
- Required Features: ${features}
- Budget: ${budget}

Return ONLY valid JSON with this exact structure (no markdown, no extra text):
{
  "pages": [{ "name": "", "purpose": "", "sections": [] }],
  "seo_keywords": [],
  "tech_stack": { "frontend": [], "backend": [], "database": [], "hosting": [] },
  "timeline": "",
  "estimated_cost": "",
  "recommendations": []
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const raw = response.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};
