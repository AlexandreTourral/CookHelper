import { CollectionApi } from "../firebase"

export async function collectionLoader() {
  const collections = await CollectionApi.getCollections()
  try {
    const key = collections["key"]
    return { collection: collections, key: key }
  } catch (error) {
    return { collection: collections, key: [] }
  }
}