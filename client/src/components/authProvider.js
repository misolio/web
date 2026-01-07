import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const oauthLogin = async (provider) => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};
