export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    // Décodage du JWT
    const payload = JSON.parse(atob(token.split('.')[1])); // Le payload est la deuxième partie du JWT
    const exp = payload.exp; // Récupérer l'expiration

    // Vérifier si le token est expiré
    if (!exp || Date.now() >= exp * 3600) {
      return false; // Le token est expiré
    }

    return true; // Le token est valide
  } catch (error) {
    console.error("Erreur lors de la vérification du token", error);
    return false;
  }
}