import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { UserNotes } from "../components/UserNotes";
import { UserWriteNoteNotification } from "../components/UserWriteNoteNotification";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <div className={style.home}>
      <SideBar className={style.sidebar} />
      <NavBar className={style.nav}/>
      <div className={style.main_content}>
        <UserWriteNoteNotification/>
        <UserNotes/>
      </div>
    </div>
  );
};
