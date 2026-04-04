import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppLayout from '../components/layout/AppLayout';
import AuthPage from '../pages/AuthPage';
import MesPlatsPage from '../pages/MesPlatsPage';
import CalendrierPage from '../pages/CalendrierPage';
import ProfilPage from '../pages/ProfilPage';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          letterSpacing: '-0.02em',
        }}
      >
        <span style={{ color: 'var(--color-primary)' }}>Wee</span>
        <span style={{ color: 'var(--color-secondary)' }}>Kook</span>
      </div>
      <span className="spinner spinner-primary" style={{ width: 28, height: 28 }} />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate to="/auth" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (currentUser) return <Navigate to="/mes-plats" replace />;
  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/mes-plats"
        element={
          <ProtectedRoute>
            <MesPlatsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendrier"
        element={
          <ProtectedRoute>
            <CalendrierPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <ProfilPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/mes-plats" replace />} />
      <Route path="*" element={<Navigate to="/mes-plats" replace />} />
    </Routes>
  );
}
