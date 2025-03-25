 import { createStore, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { isUserConnected } from '../hooks';
import { User } from 'firebase/auth';
import { listenAuthChanges } from '../firebase/authService';

export interface AuthProps {
  user: { isConnected: boolean } | null;
  User: User | null;
}

export const AuthStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: { isConnected: false }, User: null })
);

export const persist = persistState(AuthStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

export function updateAuthStore(value: boolean) {
  AuthStore.update((state) => ({
    ...state,
    user: { isConnected: value}
  }))
}

export function setUserToStore(user: User | null) {
  AuthStore.update((state) =>({
    ...state,
    User: user,
  }))
}

async function initAuthState() {
  const isConnected = await isUserConnected();
  updateAuthStore(isConnected);
}

listenAuthChanges((user) => {
  setUserToStore(user);
});

initAuthState();