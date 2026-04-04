import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Mode = 'login' | 'register';

const AUTH_ERRORS: Record<string, string> = {
  'auth/user-not-found': 'Aucun compte trouvé avec cet email.',
  'auth/wrong-password': 'Mot de passe incorrect.',
  'auth/invalid-credential': 'Email ou mot de passe invalide.',
  'auth/email-already-in-use': 'Un compte existe déjà avec cet email.',
  'auth/weak-password': 'Le mot de passe doit faire au moins 6 caractères.',
  'auth/invalid-email': 'Format d\'email invalide.',
  'auth/too-many-requests': 'Trop de tentatives. Réessayez dans quelques minutes.',
};

function getAuthError(code: string): string {
  return AUTH_ERRORS[code] ?? 'Une erreur est survenue. Réessayez.';
}

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) return setError('L\'email est requis.');
    if (!password) return setError('Le mot de passe est requis.');
    if (mode === 'register' && password !== confirm)
      return setError('Les mots de passe ne correspondent pas.');

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
      } else {
        await register(email.trim(), password);
      }
      navigate('/mes-plats');
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? '';
      setError(getAuthError(code));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'));
    setError('');
    setPassword('');
    setConfirm('');
  };

  return (
    <div className="auth-page">
      <div className="auth-blob-1" />
      <div className="auth-blob-2" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo-area">
          <div className="auth-logo-title">
            <span className="sidebar-logo-wee">Wee</span>
            <span className="sidebar-logo-kook" style={{ color: 'var(--color-secondary)' }}>Kook</span>
          </div>
          <p className="auth-subtitle">Votre planificateur de repas hebdomadaire</p>
        </div>

        {/* Form title */}
        <div style={{ marginBottom: 24 }}>
          <h2 className="auth-form-title">
            {mode === 'login' ? 'Bon retour 👋' : 'Créer un compte'}
          </h2>
          <p className="auth-subtitle" style={{ marginTop: 4 }}>
            {mode === 'login'
              ? 'Connectez-vous pour accéder à vos repas.'
              : 'Rejoignez WeeKook et planifiez vos semaines.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 18 }}>
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              className="form-input"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="auth-pw">Mot de passe</label>
            <input
              id="auth-pw"
              type="password"
              className="form-input"
              placeholder={mode === 'register' ? 'Au moins 6 caractères' : '••••••••'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-confirm">Confirmer le mot de passe</label>
              <input
                id="auth-confirm"
                type="password"
                className="form-input"
                placeholder="Répétez votre mot de passe"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading}
            style={{ marginTop: 6 }}
          >
            {loading ? (
              <><span className="spinner" /> Chargement…</>
            ) : mode === 'login' ? (
              'Se connecter'
            ) : (
              'Créer mon compte'
            )}
          </button>
        </form>

        <div className="divider" style={{ margin: '22px 0' }}>ou</div>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--color-text-light)' }}>
          {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}{' '}
          <button
            onClick={toggleMode}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              padding: 0,
            }}
          >
            {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
}
