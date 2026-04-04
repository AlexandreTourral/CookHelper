import { useState } from 'react';
import { usePlanning } from '../hooks/usePlanning';
import { usePlats } from '../hooks/usePlats';
import { getWeekId, getWeekDates, getWeekLabel, prevWeekId, nextWeekId, isToday } from '../utils/weekUtils';
import type { JourSemaine, Plat } from '../types';
import { JOURS, JOURS_LABELS, getCategorieEmoji } from '../types';
import type { Categorie } from '../types';

const TODAY_WEEK = getWeekId(new Date());

export default function CalendrierPage() {
  const [weekId, setWeekId] = useState(TODAY_WEEK);
  const [generating, setGenerating] = useState(false);
  const [slotPicker, setSlotPicker] = useState<{ jour: JourSemaine; moment: 'midi' | 'soir' } | null>(null);
  const [viewPlat, setViewPlat] = useState<Plat | null>(null);

  const { plats } = usePlats();
  const { planning, loading, assignSlot, clearSlot, generateWeek } = usePlanning(weekId);

  const weekDates = getWeekDates(weekId);
  const label = getWeekLabel(weekId);
  const isCurrentWeek = weekId === TODAY_WEEK;

  const getPlat = (id: string) => plats.find((p) => p.id === id);

  const handleGenerate = async () => {
    if (plats.length === 0) return;
    setGenerating(true);
    // Petit délai visuel avant la génération pour l'animation
    await new Promise((r) => setTimeout(r, 300));
    await generateWeek(plats);
    setGenerating(false);
  };

  const handleSlotClick = (jour: JourSemaine, moment: 'midi' | 'soir') => {
    const platId = planning?.jours?.[jour]?.[moment];
    if (platId) {
      const p = getPlat(platId);
      if (p) { setViewPlat(p); return; }
    }
    setSlotPicker({ jour, moment });
  };

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Calendrier</h1>
          <p className="page-subtitle">Planifiez vos repas de la semaine</p>
        </div>

        {/* Toolbar */}
        <div className="cal-toolbar">
          {/* Week navigation */}
          <div className="cal-week-nav">
            <button className="cal-nav-btn" onClick={() => setWeekId(prevWeekId(weekId))} aria-label="Semaine précédente">‹</button>
            <span className="cal-week-label">{label}</span>
            <button className="cal-nav-btn" onClick={() => setWeekId(nextWeekId(weekId))} aria-label="Semaine suivante">›</button>
          </div>

          {!isCurrentWeek && (
            <button className="btn btn-ghost btn-sm" onClick={() => setWeekId(TODAY_WEEK)}>
              Aujourd'hui
            </button>
          )}

          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={generating || plats.length === 0}
            title={plats.length === 0 ? 'Ajoutez d\'abord des plats dans "Mes Plats"' : ''}
          >
            {generating ? (
              <><span className="spinner" /> Génération…</>
            ) : (
              '✨ Générer ma semaine'
            )}
          </button>
        </div>
      </div>

      <div className="page-body">
        {/* Warning if no plats */}
        {plats.length === 0 && (
          <div className="alert alert-error" style={{ marginBottom: 20, maxWidth: 540 }}>
            ℹ️ Ajoutez des plats dans l'onglet <strong>Mes Plats</strong> pour pouvoir générer un planning.
          </div>
        )}

        {loading ? (
          <div className="empty-state">
            <span className="spinner spinner-dark" style={{ width: 32, height: 32 }} />
          </div>
        ) : (
          <div className="cal-grid-wrapper">
          <div className={`cal-grid${generating ? ' generating' : ''}`}>
            {JOURS.map((jour, i) => {
              const date = weekDates[i];
              const todayCol = isToday(date);
              const midiId = planning?.jours?.[jour as JourSemaine]?.midi ?? '';
              const soirId = planning?.jours?.[jour as JourSemaine]?.soir ?? '';
              const midiPlat = midiId ? getPlat(midiId) : undefined;
              const soirPlat = soirId ? getPlat(soirId) : undefined;

              return (
                <div key={jour} className={`cal-day${todayCol ? ' cal-today-row' : ''}`}>
                  {/* Day header */}
                  <div className="cal-day-header">
                    <div className="cal-day-name">{JOURS_LABELS[jour as JourSemaine]}</div>
                    <div className={`cal-day-num${todayCol ? ' today' : ''}`}>{date.getDate()}</div>
                  </div>

                  {/* Midi slot */}
                  <CalSlot
                    label="🌤 Midi"
                    plat={midiPlat}
                    generating={generating}
                    delay={i * 0.06}
                    onClick={() => handleSlotClick(jour as JourSemaine, 'midi')}
                    onClear={() => clearSlot(jour as JourSemaine, 'midi')}
                  />

                  {/* Soir slot */}
                  <CalSlot
                    label="🌙 Soir"
                    plat={soirPlat}
                    generating={generating}
                    delay={i * 0.06 + 0.03}
                    onClick={() => handleSlotClick(jour as JourSemaine, 'soir')}
                    onClear={() => clearSlot(jour as JourSemaine, 'soir')}
                  />
                </div>
              );
            })}
          </div>
          </div>
        )}
      </div>

      {/* Plat Picker modal */}
      {slotPicker && (
        <PlatPickerModal
          plats={plats}
          onSelect={async (platId) => {
            await assignSlot(slotPicker.jour, slotPicker.moment, platId);
            setSlotPicker(null);
          }}
          onClose={() => setSlotPicker(null)}
          slot={slotPicker}
        />
      )}

      {/* View plat modal */}
      {viewPlat && (
        <ViewPlatMini plat={viewPlat} onClose={() => setViewPlat(null)} />
      )}
    </>
  );
}

/* ───── Cal Slot ───── */
interface CalSlotProps {
  label: string;
  plat?: Plat;
  generating: boolean;
  delay: number;
  onClick: () => void;
  onClear: () => void;
}

function CalSlot({ label, plat, generating, delay, onClick, onClear }: CalSlotProps) {
  return (
    <div
      className={`cal-slot${plat ? ' filled' : ''}${generating ? ' generating' : ''}`}
      style={{
        animationDelay: `${delay}s`,
        ...(generating ? {} : plat ? { animation: `generateReveal 0.4s ease ${delay}s both` } : {}),
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <span className="slot-label">{label}</span>
      {plat ? (
        <>
          <span className="slot-emoji">{getCategorieEmoji(plat.categorie as Categorie)}</span>
          <span className="slot-meal-name">{plat.nom}</span>
          <button
            className="slot-clear-btn"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 10,
              color: 'var(--color-text-light)',
              cursor: 'pointer',
              padding: 0,
              marginTop: 2,
              alignSelf: 'flex-start',
              textDecoration: 'underline',
            }}
            onClick={(e) => { e.stopPropagation(); onClear(); }}
          >
            Retirer
          </button>
        </>
      ) : (
        <span className="slot-empty">+ Ajouter</span>
      )}
    </div>
  );
}

/* ───── Plat Picker Modal ───── */
interface PlatPickerProps {
  plats: Plat[];
  onSelect: (platId: string) => void;
  onClose: () => void;
  slot: { jour: JourSemaine; moment: 'midi' | 'soir' };
}

const MOMENT_LABELS = { midi: '🌤 Midi', soir: '🌙 Soir' };
const JOUR_FR: Record<JourSemaine, string> = {
  lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi',
  vendredi: 'Vendredi', samedi: 'Samedi', dimanche: 'Dimanche',
};

function PlatPickerModal({ plats, onSelect, onClose, slot }: PlatPickerProps) {
  const [search, setSearch] = useState('');
  const filtered = plats.filter((p) => p.nom.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Choisir un plat</h2>
            <p style={{ fontSize: 13, color: 'var(--color-text-light)', marginTop: 4 }}>
              {JOUR_FR[slot.jour]} · {MOMENT_LABELS[slot.moment]}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="search-bar" style={{ width: '100%', marginBottom: 20 }}>
          <span className="search-bar-icon">🔍</span>
          <input
            type="search"
            className="search-input"
            placeholder="Rechercher un plat…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-light)', fontSize: 14, padding: '24px 0' }}>
            Aucun plat trouvé.
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              maxHeight: 380,
              overflowY: 'auto',
            }}
          >
            {filtered.map((plat) => (
              <button
                key={plat.id}
                onClick={() => onSelect(plat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 14px',
                  border: '1.5px solid rgba(42,92,107,0.12)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-bg-main)',
                  cursor: 'pointer',
                  transition: 'all 0.14s ease',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,98,26,0.04)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(42,92,107,0.12)';
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg-main)';
                }}
              >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                      background: 'rgba(245,166,35,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                    }}
                  >
                    {getCategorieEmoji(plat.categorie as Categorie)}
                  </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-text-main)' }}>
                    {plat.nom}
                  </div>
                  {plat.categorie && (
                    <div style={{ fontSize: 12, color: 'var(--color-text-light)', marginTop: 2 }}>
                      {plat.categorie}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── View Plat Mini (depuis le calendrier) ───── */
function ViewPlatMini({ plat, onClose }: { plat: Plat; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ padding: 0, overflow: 'hidden', maxWidth: 480 }}>
        <div style={{ width: '100%', height: 160, background: 'linear-gradient(145deg, var(--color-bg-main), rgba(245,166,35,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
          {getCategorieEmoji(plat.categorie as Categorie)}
        </div>

        <div style={{ padding: '24px 28px 28px' }}>
          <div className="flex items-start justify-between gap-3" style={{ marginBottom: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--color-secondary)' }}>
              {plat.nom}
            </h2>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          {plat.recette ? (
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-main)', whiteSpace: 'pre-wrap' }}>
              {plat.recette}
            </p>
          ) : (
            <p style={{ fontSize: 14, color: 'var(--color-text-light)', fontStyle: 'italic' }}>
              Pas de recette renseignée.
            </p>
          )}

          <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
