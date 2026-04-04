import { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { Planning, PlanningJours, JourSemaine, Plat } from '../types';
import { JOURS } from '../types';

export function usePlanning(weekId: string) {
  const { currentUser } = useAuth();
  const [planning, setPlanning] = useState<Planning | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { setLoading(false); return; }

    const docRef = doc(db, 'users', currentUser.uid, 'planning', weekId);
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setPlanning({ id: snap.id, ...(snap.data() as { jours: Partial<PlanningJours> }) });
      } else {
        setPlanning({ id: weekId, jours: {} });
      }
      setLoading(false);
    });

    return unsub;
  }, [currentUser, weekId]);

  const savePlanning = useCallback(
    async (jours: Partial<PlanningJours>) => {
      if (!currentUser) return;
      const docRef = doc(db, 'users', currentUser.uid, 'planning', weekId);
      await setDoc(docRef, { jours }, { merge: true });
    },
    [currentUser, weekId]
  );

  const assignSlot = async (
    jour: JourSemaine,
    moment: 'midi' | 'soir',
    platId: string
  ) => {
    if (!currentUser) return;
    const current = planning?.jours ?? {};
    const jourData = current[jour] ?? { midi: '', soir: '' };
    const updated: Partial<PlanningJours> = {
      ...current,
      [jour]: { ...jourData, [moment]: platId },
    };
    await savePlanning(updated);
  };

  const clearSlot = async (jour: JourSemaine, moment: 'midi' | 'soir') => {
    await assignSlot(jour, moment, '');
  };

  /** Génère un planning aléatoire à partir des plats fournis */
  const generateWeek = useCallback(
    async (plats: Plat[]) => {
      if (!currentUser || plats.length === 0) return;

      // Fisher-Yates shuffle
      const shuffle = <T,>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      // Crée un pool d'au moins 14 plats
      let pool = shuffle([...plats]);
      while (pool.length < 14) {
        pool = [...pool, ...shuffle(plats)];
      }
      pool = pool.slice(0, 14);

      // Assigne midi/soir pour chaque jour
      const jours: Partial<PlanningJours> = {};
      let idx = 0;
      for (const jour of JOURS as JourSemaine[]) {
        const midi = pool[idx].id;
        const soir = pool[idx + 1].id;
        jours[jour] = { midi, soir };
        idx += 2;
      }

      await savePlanning(jours);
    },
    [currentUser, savePlanning]
  );

  return { planning, loading, assignSlot, clearSlot, generateWeek };
}
