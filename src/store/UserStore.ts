import { createStore, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { isUserConnected } from '../hooks';

export interface AuthProps {
  user: { isConnected: boolean } | null;
}

export const AuthStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: { isConnected: await isUserConnected() } })
);

export const persist = persistState(AuthStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

export function updateAuthStore(value: boolean) {
  AuthStore.update((state) => ({
    ...state,
    user: { isConnected: value}
  })
  )
}