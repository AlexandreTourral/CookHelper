import { Box, Stack } from "@mui/material";
import { CollectionButton } from "../atom";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CollectionList, EmptyState } from "../molecules";
import { theme } from "../theme";
import CollectionsIcon from '@mui/icons-material/Collections';
import { useState } from "react";
import { ModalNewCollection } from "../organisms";
import { CollectionApi } from "../../firebase";

export function Collection() {
  const { collection, key } = useLoaderData() as { collection: Record<string, string[]>, key: string[]};
  const hasCollections = Array.isArray(key) && key.length > 0;
  const [modalState, setModalState] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (name: string) => {
    setModalState(false);
    await CollectionApi.addCollection(name);
    navigate(".", { replace: true });
  };

  const openAddCollectionModal = () => {
    setModalState(true);
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "8px", textAlign: "center", border: "solid 1px", borderColor: theme.palette.secondary.main, padding: "16px 16px 16px 16px" }}>
        <CollectionButton />
      </Box>
      
      {hasCollections ? (
        <CollectionList collections={key} collectionsList={collection} />
      ) : (
        <EmptyState
          title="Aucune collection disponible"
          description="Vous n'avez pas encore créé de collection. Créez votre première collection pour organiser vos recettes préférées !"
          icon={<CollectionsIcon sx={{ fontSize: 80 }} />}
          actionButton={{
            label: "Ajouter une collection",
            onClick: openAddCollectionModal
          }}
        />
      )}
      
      <ModalNewCollection 
        open={modalState} 
        onClose={() => setModalState(false)} 
        onSubmit={handleSubmitForm} 
      />
    </Stack>
  )
} 