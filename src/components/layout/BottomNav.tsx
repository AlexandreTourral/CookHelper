import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/mes-plats',  icon: '🍽️', label: 'Plats' },
  { to: '/calendrier', icon: '📅', label: 'Calendrier' },
  { to: '/profil',     icon: '👤', label: 'Profil' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
