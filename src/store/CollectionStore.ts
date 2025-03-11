import { createStore, withProps } from '@ngneat/elf';

export interface CollectionProps {
  deleteItem: string[];
  isDeleting: boolean;
}

export const CollectionStore = createStore(
  { name: 'collection' },
  withProps<CollectionProps>({ deleteItem: [], isDeleting: false })
);

export function updateCollectionStatus() {
  CollectionStore.update((state) => ({
    ...state,
    isDeleting: !CollectionStore.value.isDeleting
  }))
}

export function addCollection(newItem: string) {
  CollectionStore.update((state) => ({
    ...state,
    deleteItem: [...CollectionStore.value.deleteItem, newItem]
  }))
}

export function removeCollection(item: string) {
  CollectionStore.update((state) => ({
    ...state, 
    deleteItem: CollectionStore.value.deleteItem.splice(CollectionStore.value.deleteItem.indexOf(item), 1)
  }))
}

export function resetCollection() {
  CollectionStore.update((state) => ({
    ...state,
    isDeleting: false,
    deleteItem: []
  }))
} 