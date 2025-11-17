import client from "../utils/gemini.js";

const GenerateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    const prompt = `
      Generate 5 unique recipe ideas using these ingredients:  
      ${ingredients.join(", ")}.

      Return ONLY a JSON array (no description, no markdown):

      [
        {
          "title": "",
          "type": "",
          "difficulty": "",
          "ingredients": [],
          "instructions": [],
          "nutrition": {
            "calories": "",
            "protein": "",
            "carbs": "",
            "fat": ""
          }
        }
      ]
    `;

    const result = await client.models.generateContent({
      model: "models/gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Remove accidental markdown formatting
    text = text.replace(/```json|```/g, "").trim();

    const recipes = JSON.parse(text); 

    res.json({ success: true, recipes });
  } catch (error) {
    console.error("Recipe generation error:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
};

export default GenerateRecipe;
