import { createContext } from "react";
import {
  db,
  doc,
  setDoc,
  getDocs,
  collection,
  CollectionReference,
  DocumentReference,
  query,
  where,
  deleteDoc,
} from "../config/firebase";
import { ClassUtils, SetState } from "../utils";
import { v4 as uuidv4 } from "uuid";

export const SimpleNoteListContext = createContext<
  [SimpleNotesList, SetState<SimpleNotesList>]
>([null, null] as [any, any] as [SimpleNotesList, SetState<SimpleNotesList>]);
export const SimpleNoteContext = createContext<
  [SimpleNote, SetState<SimpleNote>]
>([null, null] as [any, any] as [SimpleNote, SetState<SimpleNote>]);

type DbNote = ClassUtils.PropsTypes<Note>;

export type NoteTypes = "shared" | "pinned" | "favourite" | "all";

abstract class Base {
  [key: string]: any;

  asObj() {
    const obj: any = {};
    Object.keys(this).forEach((key) => {
      if (typeof this[key] === "function") return;
      if (key.startsWith("_")) return;
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

abstract class IRepository<T extends Note> {
  _sharedNotes: T[] = [];
  _pinNotes: T[] = [];
  _all: T[] = [];
  _favouriteNotes: T[] = [];

  abstract getAllUserNotes(userId: string): Promise<T[]>;

  protected getDocRef(): CollectionReference;
  protected getDocRef(id: string): DocumentReference;
  protected getDocRef(id?: string) {
    if (id) {
      return doc(db, "notes", id);
    }
    return collection(db, "notes");
  }

  filterNote(type: NoteTypes) {
    if (!this._all?.length) throw new Error("No Card to Filter");
    switch (type) {
      case "shared":
        if (this._sharedNotes && this._sharedNotes.length > 0)
          return this._sharedNotes;
        this._sharedNotes = this._all.filter(
          (note) => note.sharedUsers.length > 0
        );
        return this._sharedNotes;
      case "favourite":
        if (this._favouriteNotes && this._favouriteNotes.length > 0)
          return this._favouriteNotes;
        this._favouriteNotes = this._all.filter((note) => note.isFavourite);
        return this._favouriteNotes;
      case "pinned":
        if (this._pinNotes && this._pinNotes.length > 0) return this._pinNotes;
        this._pinNotes = this._all.filter((note) => note.isPinned);
        return this._pinNotes;
      case "all":
        return this._all;
      default:
        const data: never = type;
        return this._all;
    }
  }
}

export class SimpleNote extends Note {
  createNoteByObj(obj: DbNote) {
    for (const key of Object.keys(this)) {
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

  async delete() {
    const docRef = this.getDocRef(this.id);
    await deleteDoc(docRef);
  }
}

export class SimpleNotesList extends IRepository<SimpleNote> {
  constructor() {
    super();
  }

  async getAllUserNotes(userId: string): Promise<SimpleNote[]> {
    if (this._all?.length) return this._all;
    const docRef = this.getDocRef();
    const q = query(docRef, where("ownerId", "==", userId));
    const snapShots = await getDocs(q);
    this._all = snapShots.docs.map((result) =>
      new SimpleNote().createNoteByObj(result.data() as DbNote)
    );
    return this._all;
  }

  async deleteNoteById(id: string) {
    let instanceToBedeleted: SimpleNote | null = null;

    if (this._all.length < 1) throw Error("no data present to be deleted");

    const filteredNotes = this._all.filter((note) => {
      if (note.id !== id) return true;
      console.log("deleting note: ", id);
      instanceToBedeleted = note;
      return false;
    });

    if (!instanceToBedeleted) return;

    const res = await (instanceToBedeleted as SimpleNote).delete();
    console.log("delete res: ", res);

    this._all = filteredNotes;
  }
}
