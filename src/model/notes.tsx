import {
  db,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  CollectionReference,
  DocumentReference,
  query,
  where,
} from "../config/firebase";
import { ClassUtils } from "../utils";
import { v4 as uuidv4 } from "uuid";

type DbNote = ClassUtils.PropsTypes<Note>;

export type NoteTypes = "shared" | "pinned" | "favourite" | "all";

abstract class Base {
  [key: string]: any;

  asObj() {
    const obj: any = {};
    Object.keys(this).forEach((key) => {
      if (typeof this[key] === "function") return;
      if(key.startsWith("_")) return;
      obj[key] = this[key];
    });
    return obj;
  }
}

abstract class Note extends Base {
  data: object[] = [];
  sharedUsers: string[] = [];
  tags: string[] = [];
  id = "";
  createdAt = 0;
  updatedAt = 0;
  isPinned = false;
  isFavourite = false;
  ownerId = "";
  constructor(
    data?: object[],
    ownerId?: string,
    id?: string,
    tags?: string[],
    sharedUsers?: string[],
    createdAt?: number,
    updatedAt?: number,
    isPinned?: boolean,
    isFavourite?: boolean
  ) {
    super();
    if (data) this.data = data;
    if (ownerId) this.ownerId = ownerId;
  }

  protected getDocRef(): CollectionReference;
  protected getDocRef(id: string): DocumentReference;
  protected getDocRef(id?: string) {
    if (id) {
      return doc(db, "notes", id);
    }
    return collection(db, "notes");
  }

  abstract save(): Promise<any>;
}

export class SimpleNote extends Note {
  _sharedNotes?: SimpleNote[];
  _pinNotes?: SimpleNote[];
  _all?: SimpleNote[];
  _favouriteNotes?: SimpleNote[];

  createNoteByObj(obj: DbNote) {
    for (let key of Object.keys(this)) {
      if (key in obj) {
        this[key] = obj[key];
      }
    }
    return this;
  }
  async save() {
    if (!this.data || !this.data.length || !this.ownerId) {
      throw Error("Incomplete Note Data");
    }

    if (this.id) {
      throw Error("Document already exists");
    }
    this.id = uuidv4();

    return await this.update();
  }

  async update() {
    if (!this.data || !this.data.length || !this.ownerId) {
      throw Error("Incomplete Note Data");
    }

    this.updatedAt = new Date().getTime();

    if (!this.createdAt) {
      this.createdAt = this.updatedAt;
    }
    const dbObject: DbNote = this.asObj();

    const docRef = this.getDocRef(this.id);

    await setDoc(docRef, dbObject);

    return this;
  }

  async getAllUserNotes(userId: string) {
    if (this._all?.length) return this._all;
    const docRef = this.getDocRef();
    const q = query(docRef, where("ownerId", "==", userId));
    const snapShots = await getDocs(q);
    this._all = snapShots.docs.map((result) =>
      new SimpleNote().createNoteByObj(result.data() as DbNote)
    );
    return this._all;
  }

  filterNote(type: NoteTypes) {
    if (!this._all?.length) throw "No Card to Filter";
    switch (type) {
      case "shared":
        this._sharedNotes = this._all.filter(
          (note) => note.sharedUsers.length > 0
        );
        return this._sharedNotes;
      case "favourite":
        this._favouriteNotes = this._all.filter((note) => note.isFavourite);
        return this._favouriteNotes;
      case "pinned":
        this._pinNotes = this._all.filter((note) => note.isPinned);
        return this._pinNotes;
      case "all":
        return this._all;
      default:
        let data: never = type;
        return this._all;
    }
  }

  async getSharedNotes(userId?: string): Promise<SimpleNote[]> {
    if (this._sharedNotes?.length) return this._sharedNotes;
    if (this._all?.length) return this.filterNote("shared");

    if (!userId) throw Error("No Note Exists for UserId undefined");

    this._all = await this.getAllUserNotes(userId);

    return await this.getSharedNotes();
  }

  async getPinnedNotes(userId?: string): Promise<SimpleNote[]> {
    if (this._pinNotes?.length) return this._pinNotes;
    if (this._all?.length) return this.filterNote("pinned");

    if (!userId) throw Error("No Note Exists for UserId undefined");

    this._all = await this.getAllUserNotes(userId);

    return await this.getPinnedNotes();
  }

  async getFavouriteNotes(userId?: string): Promise<SimpleNote[]> {
    if (this._favouriteNotes?.length) return this._favouriteNotes;
    if (this._all?.length) return this.filterNote("favourite");

    if (!userId) throw Error("No Note Exists for UserId undefined");

    this._all = await this.getAllUserNotes(userId);

    return await this.getFavouriteNotes();
  }
}
