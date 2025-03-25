import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';
import { initAuthState } from './firebase/authService';

const App: React.FC = () => {
  
  useEffect(() => {
    initAuthState();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;