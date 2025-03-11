import { CollectionApi } from "../firebase"

export async function collectionLoader() {
  const collections = await CollectionApi.getCollections()

  const key = collections[0]["key"]


  return { collection: collections[0], key: key }
}