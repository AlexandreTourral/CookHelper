import { useState } from 'react';
import { usePlats } from '../hooks/usePlats';
import type { PlatInput } from '../hooks/usePlats';
import PlatModal from '../components/plats/PlatModal';
import type { Plat, Categorie } from '../types';
import { CATEGORIES, getCategorieEmoji } from '../types';

export default function MesPlatsPage() {
  const { plats, loading, addPlat, updatePlat, deletePlat } = usePlats();
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Plat | null>(null);
  const [viewing, setViewing] = useState<Plat | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<Categorie | ''>('');

  const filtered = plats.filter((p) => {
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === '' || p.categorie === filterCat;
    return matchSearch && matchCat;
  });

  const handleAdd = async (input: PlatInput) => {
    await addPlat(input);
    setShowAdd(false);
  };

  const handleUpdate = async (input: PlatInput) => {
    if (!editing) return;
    await updatePlat(editing.id, input);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!editing) return;
    await deletePlat(editing);
    setEditing(null);
  };

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Mes Plats</h1>
          <p className="page-subtitle">
            {plats.length === 0
              ? 'Commencez par ajouter votre premier plat'
              : `${plats.length} plat${plats.length > 1 ? 's' : ''} dans votre collection`}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + Ajouter un plat
        </button>
      </div>

      <div className="page-body">
        {/* Filters */}
        {plats.length > 0 && (
          <div className="flex flex-col gap-3" style={{ marginBottom: 20 }}>
            <div className="search-bar" style={{ width: '100%', maxWidth: 360 }}>
              <span className="search-bar-icon">🔍</span>
              <input
                type="search"
                className="search-input"
                placeholder="Rechercher un plat…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="cat-chips" style={{ overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: 4 }}>
              <button
                className={`cat-chip${filterCat === '' ? ' active' : ''}`}
                onClick={() => setFilterCat('')}
              >
                Tous
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={`cat-chip${filterCat === cat.value ? ' active' : ''}`}
                  onClick={() =>
                    setFilterCat(filterCat === cat.value ? '' : (cat.value as Categorie))
                  }
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="empty-state">
            <span className="spinner spinner-dark" style={{ width: 32, height: 32 }} />
          </div>
        )}

        {/* Empty */}
        {!loading && plats.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3 className="empty-title">Aucun plat pour l'instant</h3>
            <p className="empty-desc">
              Ajoutez vos recettes préférées pour commencer à planifier vos semaines.
            </p>
            <button className="btn btn-primary btn-lg" onClick={() => setShowAdd(true)}>
              + Ajouter mon premier plat
            </button>
          </div>
        )}

        {/* No results */}
        {!loading && plats.length > 0 && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">Aucun résultat</h3>
            <p className="empty-desc">Essayez un autre terme ou catégorie.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="plats-grid">
            {filtered.map((plat, i) => (
              <PlatCard
                key={plat.id}
                plat={plat}
                index={i}
                onView={() => setViewing(plat)}
                onEdit={() => setEditing(plat)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add modal */}
      {showAdd && (
        <PlatModal onSave={handleAdd} onClose={() => setShowAdd(false)} />
      )}

      {/* Edit modal */}
      {editing && (
        <PlatModal
          plat={editing}
          onSave={handleUpdate}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}

      {/* View modal */}
      {viewing && (
        <ViewPlatModal
          plat={viewing}
          onEdit={() => { setEditing(viewing); setViewing(null); }}
          onClose={() => setViewing(null)}
        />
      )}
    </>
  );
}

/* ───── Plat Card ───── */
interface PlatCardProps {
  plat: Plat;
  index: number;
  onView: () => void;
  onEdit: () => void;
}

function PlatCard({ plat, index, onView, onEdit }: PlatCardProps) {
  const emoji = getCategorieEmoji(plat.categorie as Categorie);

  return (
    <div
      className="plat-card"
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={onView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView()}
    >
      <div className="plat-card-placeholder">{emoji}</div>

      <div className="plat-card-body">
        <div className="plat-card-name">{plat.nom}</div>

        <div className="flex items-center justify-between gap-2">
          {plat.categorie ? (
            <span className="badge badge-teal">
              {emoji}{' '}
              {CATEGORIES.find((c) => c.value === plat.categorie)?.label ?? plat.categorie}
            </span>
          ) : (
            <span />
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            aria-label="Modifier"
            style={{ padding: '4px 8px', fontSize: 13 }}
          >
            ✏️
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───── View Plat Modal ───── */
interface ViewPlatModalProps {
  plat: Plat;
  onEdit: () => void;
  onClose: () => void;
}

function ViewPlatModal({ plat, onEdit, onClose }: ViewPlatModalProps) {
  const emoji = getCategorieEmoji(plat.categorie as Categorie);
  const catLabel = CATEGORIES.find((c) => c.value === plat.categorie)?.label;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ padding: 0, overflow: 'hidden', maxWidth: 560 }}>
        {/* Bannière emoji */}
        <div
          style={{
            width: '100%',
            height: 160,
            background: 'linear-gradient(145deg, var(--color-bg-main) 0%, rgba(245,166,35,0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
          }}
        >
          {emoji}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          <div className="flex items-start justify-between gap-3" style={{ marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 26, color: 'var(--color-secondary)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                {plat.nom}
              </h2>
              {catLabel && (
                <span className="badge badge-teal">{emoji} {catLabel}</span>
              )}
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {plat.recette ? (
            <>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                Recette
              </p>
              <p style={{ fontSize: 14.5, lineHeight: 1.75, color: 'var(--color-text-main)', whiteSpace: 'pre-wrap' }}>
                {plat.recette}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--color-text-light)', fontStyle: 'italic' }}>
              Aucune recette renseignée.
            </p>
          )}

          <div className="flex gap-2" style={{ marginTop: 24 }}>
            <button className="btn btn-outline" onClick={onEdit}>✏️ Modifier</button>
            <button className="btn btn-ghost" onClick={onClose}>Fermer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
