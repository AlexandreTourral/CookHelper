import { createStore, withProps } from '@ngneat/elf';
import { arrayUnion } from 'firebase/firestore';

export interface CollectionProps {
  deleteItem: string[];
  isDeleting: boolean;
  meals: string[];
}

export const CollectionStore = createStore(
  { name: 'collection' },
  withProps<CollectionProps>({ deleteItem: [], isDeleting: false, meals: [] })
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

export function addMealToCollection(newMeal: string) {
  CollectionStore.update((state) => ({
    ...state,
    meals: [...CollectionStore.value.meals, newMeal]
  }))
}

export function removeMealFromCollection(meal: string) {
  CollectionStore.update((state) => ({
    ...state,
    meals: CollectionStore.value.meals.splice(CollectionStore.value.meals.indexOf(meal), 1)
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
    deleteItem: [],
    meals: [],
  }))
}



