
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import UserAvatar from "../assets/images/user_avatar.jpg";

const EMPTY_PROFILE = {
  name: "",
  email: "",
  age: "",
  phone: "",
  skinType: "normal",
  skinFeatures: [],
  allergens: [],
  photoURL: UserAvatar,
  createdAt: null,
  updatedAt: null,
};

/**
 * Створює або підтягує профіль користувача з Firestore
 * @param {Firebase.User} user - об'єкт користувача Firebase
 * @param {Object} extraData - додаткові поля (наприклад, firstName для email/password)
 * @returns {Object} профіль користувача
 */
export async function ensureUserProfile(user, extraData = {}) {
  if (!user?.uid) throw new Error("User UID is missing");

  const profileRef = doc(db, "profile", user.uid);
  const snap = await getDoc(profileRef);

  if (!snap.exists()) {
    // Якщо профілю ще немає, створюємо новий
    const newProfile = {
      ...EMPTY_PROFILE,
      name: extraData.firstName || user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || UserAvatar,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(profileRef, newProfile);
    console.log("🔥 New profile created:", user.uid);
    return newProfile;
  } else {
    // Профіль вже є, повертаємо його дані
    const data = snap.data();
    console.log("📄 Profile loaded:", data);
    return data;
  }
}
