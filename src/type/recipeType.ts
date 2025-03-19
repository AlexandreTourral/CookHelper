export enum ingredientEnum {
  g = "gramme",
  L = "litre",
  ml = "millilitre",
  kg = "kilo",
  cas = "cuillère à soupe",
  caf = "cuillère à café",
  portion= "portion",
}

export type ingredient = {
  name: string
  quantity: number
  type: ingredientEnum
}

export interface recipeType {
  ingredients: Record<string, ingredient[]>
}