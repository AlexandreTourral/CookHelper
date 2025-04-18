import { createStore, withProps } from '@ngneat/elf';
import { ingredient, ingredientEnum } from '../type/recipeType';

export interface RecipeProps {
  meal: string;
  ingredient: ingredient[];
  isDeleting: boolean;
}

export const RecipeStore = createStore(
  { name: 'recipe' },
  withProps<RecipeProps>({ meal: "", ingredient: [], isDeleting: false })
);

export function updateRecipeDeletingStatus() {
  RecipeStore.update((state) => ({
    ...state,
    isDeleting: !state.isDeleting,
  }))
}

export function addMealName(newMealName: string) {
  RecipeStore.update((state) => ({
    ...state,
    meal: newMealName,
  }))
}

export function addIngredient(name: string, quantity: number, type: ingredientEnum) {
  RecipeStore.update((state) => ({
    ...state,
    ingredient: [...state.ingredient, {name, quantity, type}]
  }))
}

export function removeIngredient(name: string) {
  RecipeStore.update((state) => ({
    ...state,
    ingredient: state.ingredient.filter((ingredient) => ingredient.name !== name),
  }));
}

export function resetIngredient() {
  RecipeStore.update(() => ({
    meal: "",
    ingredient: [],
    isDeleting: false,
  }))
} 

