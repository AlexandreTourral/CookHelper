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

export interface ingredientType {
  ingredients: Record<string, ingredient[]>
}

export type recipeType = {
  meals: Record<string, ingredient[]>,
  key: string[]
}