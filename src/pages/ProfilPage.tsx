import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePlats } from '../hooks/usePlats';

export default function ProfilPage() {
  const { currentUser, logout } = useAuth();
  const { plats } = usePlats();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const initials = currentUser?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mon Profil</h1>
          <p className="page-subtitle">Gérez votre compte WeeKook</p>
        </div>
      </div>

      <div className="page-body">
        <div className="profil-card">
          {/* Avatar */}
          <div className="profil-avatar">{initials}</div>

          {/* Email */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-secondary)', marginBottom: 4 }}>
            Mon compte
          </h2>
          <p className="profil-email">{currentUser?.email}</p>

          <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid rgba(0,0,0,0.07)' }} />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            <div className="profil-stat">
              <div>
                <div className="profil-stat-num">{plats.length}</div>
                <div className="profil-stat-label">Plat{plats.length !== 1 ? 's' : ''} enregistré{plats.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
            <div className="profil-stat">
              <div>
                <div className="profil-stat-num" style={{ fontSize: 28 }}>🍽️</div>
                <div className="profil-stat-label">Bon appétit !</div>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div
            style={{
              background: 'rgba(74,188,170,0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              border: '1px solid rgba(74,188,170,0.18)',
              fontSize: 13.5,
              color: 'var(--color-secondary)',
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            <strong>💡 Astuce :</strong> Ajoutez au moins 14 plats dans votre collection pour que la génération automatique évite toute répétition sur une semaine complète.
          </div>

          {/* Logout */}
          <button className="btn btn-danger w-full" onClick={handleLogout}>
            🚪 Se déconnecter
          </button>
        </div>
      </div>
    </>
  );
}
