import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useState } from "react";
import { Auth, User as AuthUser } from "firebase/auth";
import { User } from "../model/user";

export const UserContext = createContext<User>((null as any )as User);

export const useAuthUser = (auth: Auth) => {
  const [authUser, loading, error] = useAuthState(auth);
  const [user, setUser] = useState<User>((null as any )as User);

  const updateUser = async (userAuth: AuthUser) => {
    let user = await User.getUserById(userAuth.email as string);
    console.log("already exists: ",user);
    if(!user) {
      const {displayName, email, photoURL, uid, providerData, phoneNumber} = userAuth;
      let user = new User(email as string, displayName as string, photoURL as string);
      user = user.setUid(uid).setProvider(providerData[0].providerId);
      if(phoneNumber) user.setPhone(phoneNumber);
      user = await user.save();
      console.log("created User: ", user);
    }
    setUser(user as User);
  };

  const logOutUser = () => {
    setUser((null as any) as User);
  }
  
  useEffect(() => {
    if (loading) return;
    if (authUser) updateUser(authUser);
    if(!loading && !error && !authUser) logOutUser();
  }, [authUser, loading]);

  return [user];
};
