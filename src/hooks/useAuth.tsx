import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useState } from "react";
import { Auth, User as AuthUser } from "firebase/auth";
import { User } from "../model/user";
import * as cache from "../model/localStorage";

export const UserContext = createContext<User>((null as any )as User);

export const useAuthUser = (auth: Auth) => {
  const [authUser, loading, error] = useAuthState(auth);
  const [user, setUser] = useState<User>((null as any )as User);

  const updateUser = async (userAuth: AuthUser) => {
    let user = await User.getUserById(userAuth.email as string);

    if(!user) {
      user = User.getInstanceByAuth(userAuth);
      user = await user.save();
    }

    setUser(user);
    cache.setUser(user.asObj());

  };

  const logOutUser = () => {
    setUser((null as any) as User);
    cache.removeUser();
  }

  useEffect(() => {
    const user = cache.getUser();
    if(!user) return;
    setUser(user);
  },[]);
  
  useEffect(() => {
    if (loading) return;
    if(!loading && !error && !authUser) logOutUser();
    if (user) return;
    if (authUser) updateUser(authUser);
  }, [authUser, loading]);

  return [user];
};
