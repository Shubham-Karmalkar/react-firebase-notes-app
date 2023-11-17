import style from "./SideBar.module.css";
import { UserIcon } from "./UserIcon";
import { AddNewNote } from "./AddNewNote";
import { Link } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";

export const SideBar = () => {
  return (
    <div className={style.sidebar_container}>
      <ul>
        <li><UserIcon /></li>
        <li><AddNewNote /></li>
        <li><Link to="#" className={`${style.links} ${style.notes}`}><GiNotebook/><span>Your Notes</span></Link></li>
        <li><Link to="#" className={style.links}><SlNotebook/><span>Notebooks</span></Link></li>
        <li><Link to="#" className={style.links}><AiOutlineClockCircle/><span>Reminder</span></Link></li>
        <li><Link to="#" className={style.links}><FiTag/><span>Tags</span></Link></li>
        <li><Link to="#" className={style.links}><ImBin2/><span>Bin</span></Link></li>
      </ul>
    </div>
  );
};
