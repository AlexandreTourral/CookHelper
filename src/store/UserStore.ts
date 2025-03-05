import { createStore, withProps } from '@ngneat/elf';
import { isUserConnected } from '../hooks';

interface AuthProps {
  user: { isConnected: boolean } | null;
}

export const AuthStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: { isConnected: isUserConnected() } })
);

export function updateAuthStore(value: boolean) {
  AuthStore.update((state) => ({
    ...state,
    user: { isConnected: value}
  })
  )
}