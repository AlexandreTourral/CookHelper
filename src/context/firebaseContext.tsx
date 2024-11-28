import React, { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const FirebaseContext = createContext<any>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  return (
    <FirebaseContext.Provider value={{ db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
