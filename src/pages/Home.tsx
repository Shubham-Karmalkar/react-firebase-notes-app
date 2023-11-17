import { SideBar } from "../components/SideBar";
import { UserNotes } from "../components/UserNotes";
import { UserWriteNoteNotification } from "../components/UserWriteNoteNotification";
import style from "./Home.module.css";

export const Home = () => {
  return (
    <div className={style.home}>
      <SideBar />
      <div className={style.main_content}>
        <UserWriteNoteNotification/>
        <UserNotes/>
      </div>
    </div>
  );
};
