import style from "./SideBar.module.css";
import { UserIcon } from "./UserIcon";
import { AddNewNote } from "./AddNewNote";
import { Link } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import { ImBin2 } from "react-icons/im";
import logo from "../resource/logo.png";
import goUpgradeLogo from '../resource/go_upgrade.png';

export const SideBar = ({className}: {className?:any}) => {

  return (
    <div className={`${style.sidebar_container} ${className}`}>
      <ul>
        <li><img className={style.logo} src={logo} alt="company logo"/></li>
        <li><UserIcon /></li>
        <li><AddNewNote /></li>
        <ul className={style.sidebar_scroll}>
           <li><Link to="#" className={`${style.links} ${style.notes}`}><GiNotebook/><span>Your Notes</span></Link></li>
           <li><Link to="#" className={style.links}><SlNotebook/><span>Notebooks</span></Link></li>
           <li><Link to="#" className={style.links}><AiOutlineClockCircle/><span>Reminder</span></Link></li>
           <li><Link to="#" className={style.links}><FiTag/><span>Tags</span></Link></li>
           <li><Link to="#" className={style.links}><ImBin2/><span>Bin</span></Link></li>
           <li><img className={style.logo} src={goUpgradeLogo} alt="go upgrade"/></li>
           <li>Upgrade To Pro Account To Explore Premiun Features</li>
           <li className={style.upgradeBtn}><span onClick={()=> {}}>Upgrade</span></li>
        </ul>
      </ul>
    </div>
  );
};
