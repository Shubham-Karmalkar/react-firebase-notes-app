import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    const sign = await signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <input placeholder="Email..." type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password..." type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
