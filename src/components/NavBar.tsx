import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import brand_logo from "../resource/logo.png";
import { useContext } from "react";
import { UserContext } from "../hooks/useAuth";
import { HiMiniBars3 } from "react-icons/hi2";
import { SideBar } from "./SideBar";
import { DropDownBtn } from "../utils";
import { UserNotificationIcons } from "./UserNotificationIcons";

const LoginBtns =() => {
  return (
    <div className={styles.signLog}>
        <Link to="/login" className={styles.signBtn}>Log in</Link>
      </div>
  )
}

export const NavBar = ({className}:{className?:any}) => {
  const user = useContext(UserContext);
  return (
    <div className={`${styles.topnav} ${className}`}>
      <div className={styles.leftSide}>
        {user ? 
          <DropDownBtn 
            dropDownMenuClass={styles.sidebar} 
            dropDown={<HiMiniBars3 className={styles.moreBtn} />} 
            dropDownMenu={<SideBar/>} 
            type={styles["sidebarDropdown"]} 
          /> 
          : 
          ""
        }
        <Link to="/">
          <img src={brand_logo} alt="brand logo" className={styles.brand_logo} style={user? {}: {display:"block"}} />
        </Link>
      </div>
    {user ? <UserNotificationIcons className={styles.notification}/>: <LoginBtns/>}
    </div>
  );
};
