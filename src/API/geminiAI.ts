import { RecipeApi } from "../firebase";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;

export async function selectMeals() {
  const menus = (await RecipeApi.getRecipes())[0];


  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  J'ai une liste de menus: ${menus.meal}.
  Génère un plan de repas pour une semaine (midi et soir), structuré comme ceci :
  {
      "lundi": { "lunch": "...", "diner": "..." },
      "mardi": { "lunch": "...", "diner": "..." },
      ...
      "dimanche": { "lunch": "...", "diner": "..." }
  }
  sans aucun texte supplémentaire.
  Réponds uniquement avec du JSON, **sans balises \`\`\`json ou autres.**.
  `;

  let result = await model.generateContent(prompt);
  let textResponse = result.response.text();
  textResponse = textResponse.replace(/```json|```/g, "").trim();
  const response = JSON.parse(result.response.text())
  return response
}
