import { useState } from "react";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/sidebar";
import { UserNotes } from "./components/notes/UserNotes";
import { UserWriteNoteNotification } from "./components/home-subnav/UserWriteNoteNotification";
import style from "./Home.module.css";
import { SimpleNote, SimpleNotesList, SimpleNoteListContext, SimpleNoteContext } from "../../model/notes";

export const Home = () => {
  const [notes, setNotes] = useState(new SimpleNotesList());
  const [updateNote, setUpdateNote] = useState<SimpleNote>(null as any as SimpleNote);

  
  return (
    <div className={style.home}>
      <SideBar className={style.sidebar} />
      <NavBar className={style.nav} />
      <div className={style.main_content}>
        <SimpleNoteListContext.Provider value={[notes, setNotes]}>
          <SimpleNoteContext.Provider value={[updateNote, setUpdateNote]}>

            <UserWriteNoteNotification />
            <UserNotes/>

          </SimpleNoteContext.Provider>
        </SimpleNoteListContext.Provider>
      </div>
    </div>
  );
};
