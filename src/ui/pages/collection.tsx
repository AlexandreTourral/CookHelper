import { Stack, Typography } from "@mui/material";
import { CollectionButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { CollectionList } from "../molecules";

export function Collection() {
  const { collection, key } = useLoaderData() as { collection: Record<string, string[]>, key: string[]}

  return (
    <Stack spacing={3}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        📚 Vos Collections 📋
      </Typography>
      <CollectionButton />
      <CollectionList collections={key} collectionsList={collection} />
    </Stack>
  )
} 