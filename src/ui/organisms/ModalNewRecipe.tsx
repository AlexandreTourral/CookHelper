import { ModalAddRecipe } from "./ModalAddRecipe";

type modalNewRecipeProps = {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

export function ModalNewRecipe({ open, onClose, onSubmit }: modalNewRecipeProps) {

  return (
    <ModalAddRecipe create={true} meal={""} onClose={onClose} onSubmit={(name) => onSubmit(name)} open={open} />
  )
}