import { User, DbUser } from "./user";


export const getUser = (key: "user" = "user") => {
  const userObjRaw = localStorage.getItem(key);
  if(!userObjRaw) return;
  const userObj = JSON.parse(userObjRaw);
  let instance = User.getInstanceByObj(userObj);
  return instance;
};

export const setUser = (userObj: DbUser, key:"user" = "user") => {
    localStorage.setItem(key, JSON.stringify(userObj));
}

export const removeUser = (key:"user" = "user") => {
    localStorage.removeItem(key);
}