import { createStore, withProps } from "@ngneat/elf";

export interface sidebarProps {
  isHidden: boolean;
  isMobile: boolean;
  isOpen: boolean;
}

export const SidebarState = createStore(
  { name: 'sidebar' },
  withProps<sidebarProps>({ 
    isHidden: false,
    isMobile: false,
    isOpen: false
  })
);

export function updateSidebarStatus() {
  SidebarState.update((state) => ({
    ...state,
    isHidden: !state.isHidden,
  }));
}

export function setMobileStatus(isMobile: boolean) {
  SidebarState.update((state) => ({
    ...state,
    isMobile,
    isOpen: isMobile ? false : state.isOpen,
  }));
}

export function toggleSidebar() {
  SidebarState.update((state) => ({
    ...state,
    isOpen: !state.isOpen,
  }));
}

export function closeSidebar() {
  SidebarState.update((state) => ({
    ...state,
    isOpen: false,
  }));
}