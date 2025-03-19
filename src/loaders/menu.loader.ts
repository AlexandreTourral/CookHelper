import { MenuApi } from "../firebase/menuApi"

export async function menuLoader() {
  const menu = await MenuApi.getMenu();
  return menu
}