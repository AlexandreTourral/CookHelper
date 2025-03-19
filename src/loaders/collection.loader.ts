import { CollectionApi } from "../firebase"

export async function collectionLoader() {
  const collections = await CollectionApi.getCollections()
  const key = collections["key"]
  return { collection: collections, key: key }
}