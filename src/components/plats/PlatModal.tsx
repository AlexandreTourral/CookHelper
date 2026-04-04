import { useState } from 'react';
import type { Plat, Categorie } from '../../types';
import { CATEGORIES } from '../../types';
import type { PlatInput } from '../../hooks/usePlats';

interface PlatModalProps {
  plat?: Plat | null;
  onSave: (input: PlatInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
}

const EMPTY: PlatInput = { nom: '', categorie: '', recette: '' };

export default function PlatModal({ plat, onSave, onDelete, onClose }: PlatModalProps) {
  const isEdit = !!plat;
  const [form, setForm] = useState<PlatInput>(
    plat ? { nom: plat.nom, categorie: plat.categorie, recette: plat.recette } : EMPTY
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (key: keyof PlatInput, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = async () => {
    if (!form.nom.trim()) { setError('Le nom du plat est requis.'); return; }
    setSaving(true);
    setError('');
    try {
      await onSave(form);
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';
      const msg  = (err as { message?: string })?.message ?? '';
      if (code === 'permission-denied' || msg.includes('Missing or insufficient permissions')) {
        setError('Permissions refusées. Vérifiez les règles de sécurité Firestore dans la console Firebase.');
      } else {
        setError(`Erreur : ${msg || code || 'inconnue'}. Réessayez.`);
      }
      console.error('[WeeKook] Erreur sauvegarde plat :', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setDeleting(true);
    try {
      await onDelete();
      onClose();
    } catch {
      setError('Erreur lors de la suppression.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? '✏️ Modifier le plat' : '🍽️ Nouveau plat'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        {/* Nom */}
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label" htmlFor="plat-nom">Nom du plat *</label>
          <input
            id="plat-nom"
            type="text"
            className="form-input"
            placeholder="Ex : Risotto aux champignons"
            value={form.nom}
            onChange={(e) => set('nom', e.target.value)}
            autoFocus
          />
        </div>

        {/* Catégorie */}
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label">Catégorie</label>
          <div className="cat-chips">
            <button
              type="button"
              className={`cat-chip${form.categorie === '' ? ' active' : ''}`}
              onClick={() => set('categorie', '')}
            >
              Aucune
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`cat-chip${form.categorie === cat.value ? ' active' : ''}`}
                onClick={() => set('categorie', cat.value as Categorie)}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recette */}
        <div className="form-group" style={{ marginBottom: 16 }}>
          <label className="form-label" htmlFor="plat-recette">Recette</label>
          <textarea
            id="plat-recette"
            className="form-textarea"
            placeholder="Ingrédients, étapes de préparation, astuces…"
            value={form.recette}
            onChange={(e) => set('recette', e.target.value)}
            style={{ minHeight: 130 }}
          />
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 12 }}>{error}</div>}

        {/* Delete confirm */}
        {isEdit && confirmDelete && (
          <div className="alert alert-error" style={{ marginBottom: 14, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <span>⚠️ Êtes-vous sûr de vouloir supprimer ce plat ? Cette action est irréversible.</span>
            <div className="flex gap-2">
              <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
                {deleting ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Suppression…</> : 'Confirmer la suppression'}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(false)}>Annuler</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: isEdit ? 'space-between' : 'flex-end' }}>
          {isEdit && !confirmDelete && (
            <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(true)} disabled={deleting}>
              🗑️ Supprimer
            </button>
          )}
          <div className="flex gap-2">
            <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? (
                <><span className="spinner" /> Sauvegarde…</>
              ) : isEdit ? (
                'Enregistrer'
              ) : (
                '✓ Ajouter le plat'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
