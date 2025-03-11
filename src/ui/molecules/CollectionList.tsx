import { Box, Stack } from "@mui/material";
import { theme } from "../theme";
import { CollectionCard } from "../atom";

type collectionListProps = {
  collections: string[]
  collectionsList: Record<string, string[]>
}

export function CollectionList({ collections, collectionsList }: collectionListProps) {
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "16px", border: "solid 1px", borderColor: theme.palette.secondary.main, marginTop: "32px", padding: "8px 16px 8px 16px" }}>
      <Stack direction="column">
        { collections.map((collectionKey) => (
          <CollectionCard key={collectionKey} collectionKey={collectionKey} collectionsList={collectionsList} />
        ))}
      </Stack>
    </Box>
  )
}