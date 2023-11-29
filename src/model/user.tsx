import {User as AuthUser} from 'firebase/auth';
import { db, doc, getDoc, setDoc } from '../config/firebase';

export type DbUser = {
  email: string,
  name: string, 
  uid: string,
  createdAt?: number;
  updatedAt?: number;
  providerId: string,
  imageUrl?: string,
  phoneNumber?:string,
}
export class User {
  uid: string = "";
  providerId: string = "";
  phoneNumber: string = "";
  createdAt: number = 0;
  updatedAt: number = 0;

  constructor(
    public email: string,
    public name: string,
    public imageUrl: string
  ) {
    this.email = email;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  setUid(uid: string) {
    this.uid = uid;
    return this;
  }

  setProvider(providerId: string) {
    this.providerId = providerId;
    return this;
  }

  setPhone(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
    return this;
  }

  setTimeStamp(createdAt: number, updatedAt: number) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    return this;
  }

  asObj(): DbUser {
    const {
      email,
      name,
      uid,
      providerId,
      imageUrl,
      phoneNumber,
      createdAt,
      updatedAt,
    } = this;
    return {
      email,
      name,
      uid,
      providerId,
      imageUrl,
      phoneNumber,
      createdAt,
      updatedAt,
    };
  }

  private static getDocRef(id: string) {
    return doc(db, "users", id);
  }

  async save() {
    const userObj = this.asObj();
    if (!userObj.email || !userObj.name || !userObj.uid) {
      throw new Error("Incomplete User Data");
    }

    const docRef = User.getDocRef(userObj.email);

    userObj.updatedAt = new Date().getTime();
    this.updatedAt = userObj.updatedAt;

    if (!userObj.createdAt) {
      userObj.createdAt = userObj.updatedAt;
      this.createdAt = userObj.updatedAt;
    }
    await setDoc(docRef, userObj);

    return this;
  }

  static getInstanceByObj(userObj: DbUser): User {
    const fallbackDate = new Date().getTime();
    const {
      email,
      name,
      uid,
      providerId,
      imageUrl,
      phoneNumber,
      createdAt,
      updatedAt,
    } = userObj;
    if (!email || !name || !uid) {
      throw new Error("Incomplete User Data");
    }
    return new User(email, name, imageUrl || "")
      .setUid(uid)
      .setPhone(providerId)
      .setPhone(phoneNumber || "")
      .setTimeStamp(createdAt || fallbackDate, updatedAt || fallbackDate);
  }

  static getInstanceByAuth(authUser: AuthUser): User {
    const { displayName, email, photoURL, uid, providerData, phoneNumber } =
      authUser;
    const obj = {
      name: displayName,
      imageUrl: photoURL,
      email,
      uid,
      providerData,
      phoneNumber,
    };
    return this.getInstanceByObj(obj as any as DbUser);
  }

  static async getUserById(emailId: string) {
    const docRef = this.getDocRef(emailId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return this.getInstanceByObj(docSnap.data() as User);
  }
}

