import { PlanningApi } from "../firebase";
import { RecipeApi } from "../firebase/recipeApi";
import { ingredient, ingredientEnum } from "../type/recipeType";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateShoppingList() {
  const weekPlan = await PlanningApi.getWeekPlan();
  const { recipe } = await RecipeApi.getRecipe();
  const shoppingList: Record<string, { quantity: number; type: ingredientEnum }> = {};

  (["lunch", "diner"] as const).forEach((mealType) => {
    Object.entries(weekPlan[mealType]).forEach(([mealName]) => {
      const ingredients: ingredient[] = recipe[mealName] || [];
      ingredients.forEach(({ name, quantity, type }) => {
        if (shoppingList[name]) {
          shoppingList[name].quantity += quantity;
        } else {
          shoppingList[name] = { quantity, type };
        }
      });
    });
  });

  return Object.entries(shoppingList)
    .map(([name, { quantity, type }]) => ({ name, quantity, type }))
    .sort((a, b) => a.type.localeCompare(b.type));
}

export async function generateShoppingListPDF() {
  const shoppingList = await generateShoppingList();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;
  page.drawText("Liste de Courses", {
    x: 50,
    y,
    size: 24,
    font,
    color: rgb(0, 0, 0),
  });

  y -= 30;
  shoppingList.forEach(({ name, quantity, type }) => {
    page.drawText(`- ${name}: ${quantity} (${type})`, {
      x: 50,
      y,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}
