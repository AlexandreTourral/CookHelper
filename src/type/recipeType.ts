export enum ingredientEnum {
  g = "gramme",
  mg = "milligramme",
  kg = "kilogramme",
  L = "litre",
  ml = "millilitre",
  cl = "centilitre",
  dl = "décilitre",
  cas = "cuillère à soupe", // J'ai gardé cas et supprimé cs qui est un doublon
  caf = "cuillère à café", // J'ai gardé caf et supprimé cc qui est un doublon
  pincee = "pincée",
  zeste = "zeste",
  goutte = "goutte",
  bouquet = "bouquet",
  branche = "branche",
  feuille = "feuille",
  gousse = "gousse",
  poignee = "poignée",
  tranche = "tranche",
  portion = "portion",
  tasse = "tasse",
  verre = "verre",
  bol = "bol",
  qsp = "quantité suffisante pour",
  pot = "pot",
  sachet = "sachet",
  boite = "boîte",
  conserve = "conserve", 
  baton = "bâton",
  morceau = "morceau",
  filet = "filet",
  unite = "unité"
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