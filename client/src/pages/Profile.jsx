import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import UserAvatar from "../assets/images/user_avatar.jpg";
import "../assets/styles/profile.css";
import { SKIN_TYPES, SKIN_FEATURES, ALLERGENS } from "../assets/data/skinData";

const EMPTY_PROFILE = {
  name: "",
  email: "",
  age: "",
  phone: "",
  skinType: "normal",
  skinFeatures: [],
  allergens: [],
  photoURL: UserAvatar
};

export default function Profile() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      const profileRef = doc(db, "profile", firebaseUser.uid);
      const snap = await getDoc(profileRef);

      if (!snap.exists()) {
        await setDoc(profileRef, {
          ...EMPTY_PROFILE,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
          createdAt: serverTimestamp()
        });
        setUser({ ...EMPTY_PROFILE, email: firebaseUser.email, name: firebaseUser.displayName || "" });
      } else {
        const data = snap.data();
        setUser({
          ...EMPTY_PROFILE,
          ...data,
          skinFeatures: data.skinFeatures || [],
          allergens: data.allergens || [],
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleArrayValue = (key, value) => {
    setUser(prev => ({
      ...prev,
      [key]: prev[key]?.includes(value)
        ? prev[key].filter(v => v !== value)
        : [...(prev[key] || []), value]
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      await setDoc(doc(db, "profile", currentUser.uid), {
        ...user,
        updatedAt: serverTimestamp()
      }, { merge: true });

      setIsEditing(false);
    } catch (error) {
      console.error("Save profile error:", error);
      alert("Error saving profile");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      {/* Аватар та основна інфа */}
      <div className="profile-top">
        <div className="profile-avatar">
          <img src={user.photoURL} alt={user.name} />
        </div>

        <div className="profile-info">
          <h2>{t("profile.generalInfo")}</h2>
          <ul>
            <li>
              <strong>{t("profile.name")}:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  className="profile-input"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              ) : (
                user.name
              )}
            </li>

            <li>
              <strong>{t("profile.email")}:</strong> {user.email}
            </li>

            <li>
              <strong>{t("profile.age")}:</strong>{" "}
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  value={user.age}
                  className="profile-input"
                  onChange={(e) => setUser({ ...user, age: e.target.value })}
                />
              ) : (
                user.age
              )}
            </li>

          </ul>
        </div>

        <div className="profile-actions">
          <button
            className="btn-change-password"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? t("profile.cancel") : t("profile.editProfile")}
          </button>
        </div>
      </div>

      {/* SKIN */}
      <div className="profile-skin">
        <div>
          <strong>{t("profile.skinType")}:</strong>
          {isEditing ? (
            <select value={user.skinType} onChange={e => setUser({ ...user, skinType: e.target.value })}>
              {SKIN_TYPES.map(type => (
                <option key={type} value={type}>{t(`profile.skinTypes.${type}`)}</option>
              ))}
            </select>
          ) : (
            <p>{t(`profile.skinTypes.${user.skinType}`)}</p>
          )}

          <strong>{t("profile.skinFeatures")}:</strong>
          <ul>
            {(isEditing ? SKIN_FEATURES : user.skinFeatures || []).map(feature => {
              const selected = user.skinFeatures?.includes(feature);
              return (
                <li
                  key={feature}
                  className={selected ? "selected" : ""}
                  onClick={() => isEditing && toggleArrayValue("skinFeatures", feature)}
                >
                  {t(`profile.skinFeaturesList.${feature}`)}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <strong>{t("profile.allergens")}:</strong>
          <ul>
            {(isEditing ? ALLERGENS : user.allergens || []).map(allergen => {
              const selected = user.allergens?.includes(allergen);
              return (
                <li
                  key={allergen}
                  className={selected ? "selected" : ""}
                  onClick={() => isEditing && toggleArrayValue("allergens", allergen)}
                >
                  {t(`profile.allergensList.${allergen}`)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {isEditing && (
        <div className="profile-save">
          <button
            className="btn-change-password btn-save-profile"
            onClick={handleSaveProfile}
          >
            {t("profile.saveProfile")}
          </button>
        </div>
      )}
    </div>
  );
}
