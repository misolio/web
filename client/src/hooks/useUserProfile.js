import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function useUserProfile() {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async user => {
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "profile", user.uid));
      if (snap.exists()) setProfile(snap.data());

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { profile, loadingProfile };
}
