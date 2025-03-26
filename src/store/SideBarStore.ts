import { createStore, withProps } from "@ngneat/elf";

export interface sidebarProps {
  isHidden: boolean;
}

export const SidebarState = createStore(
  { name: 'sidebar' },
  withProps<sidebarProps>({ isHidden: false })
);

export function updateSidebarStatus() {
  SidebarState.update((state) => ({
    ...state,
    isHidden: !state.isHidden,
  }))
}