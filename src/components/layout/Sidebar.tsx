import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavItem {
  to: string;
  icon: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/mes-plats',   icon: '🍽️',  label: 'Mes Plats' },
  { to: '/calendrier',  icon: '📅',  label: 'Calendrier' },
  { to: '/profil',      icon: '👤',  label: 'Mon Profil' },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-deco" />
      <div className="sidebar-deco-2" />

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-wee">Wee</span>
          <span className="sidebar-logo-kook">Kook</span>
        </div>
        <p className="sidebar-tagline">Planificateur de repas</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer logout */}
      <div className="sidebar-footer">
        <button className="nav-item" onClick={handleLogout} style={{ width: '100%' }}>
          <span className="nav-icon">🚪</span>
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  );
}
