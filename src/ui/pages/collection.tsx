import { Box, Stack, Typography } from "@mui/material";
import { CollectionButton } from "../atom";
import { useLoaderData } from "react-router-dom";
import { CollectionList } from "../molecules";
import { theme } from "../theme";

export function Collection() {
  const { collection, key } = useLoaderData() as { collection: Record<string, string[]>, key: string[]}

  return (
    <Stack spacing={3}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", textAlign: "center", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <CollectionButton />
      </Box>
      <CollectionList collections={key} collectionsList={collection} />
    </Stack>
  )
} 