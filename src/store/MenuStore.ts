import { createStore, withProps } from '@ngneat/elf';

export interface MenuProps {
  deleteItem: string[];
  isDeleting: boolean;
}

export const MenuStore = createStore(
  { name: 'menu' },
  withProps<MenuProps>({ deleteItem: [], isDeleting: false })
);

export function updateMenuStatus() {
  MenuStore.update((state) => ({
    ...state,
    isDeleting: !MenuStore.value.isDeleting
  }))
}

export function addItem(newItem: string) {
  MenuStore.update((state) => ({
    ...state,
    deleteItem: [...MenuStore.value.deleteItem, newItem]
  }))
}

export function removeItem(item: string) {
  MenuStore.update((state) => ({
    ...state, 
    deleteItem: MenuStore.value.deleteItem.splice(MenuStore.value.deleteItem.indexOf(item), 1)
  }))
}

export function resetMenu() {
  MenuStore.update((state) => ({
    ...state,
    isDeleting: false,
    deleteItem: []
  }))
} 