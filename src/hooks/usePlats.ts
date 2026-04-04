import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { Plat, Categorie } from '../types';

export interface PlatInput {
  nom: string;
  categorie: Categorie | '';
  recette: string;
}

export function usePlats() {
  const { currentUser } = useAuth();
  const [plats, setPlats] = useState<Plat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) { setPlats([]); setLoading(false); return; }

    const col = collection(db, 'users', currentUser.uid, 'plats');
    const q = query(col, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snap) => {
      setPlats(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Plat, 'id'>) }))
      );
      setLoading(false);
    });

    return unsub;
  }, [currentUser]);

  const addPlat = async (input: PlatInput): Promise<void> => {
    if (!currentUser) return;
    const col = collection(db, 'users', currentUser.uid, 'plats');
    await addDoc(col, {
      nom: input.nom,
      categorie: input.categorie,
      recette: input.recette,
      createdAt: serverTimestamp(),
    });
  };

  const updatePlat = async (platId: string, input: PlatInput): Promise<void> => {
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid, 'plats', platId);
    await updateDoc(docRef, {
      nom: input.nom,
      categorie: input.categorie,
      recette: input.recette,
    });
  };

  const deletePlat = async (plat: Plat): Promise<void> => {
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid, 'plats', plat.id);
    await deleteDoc(docRef);
  };

  return { plats, loading, addPlat, updatePlat, deletePlat };
}
