import { useContext } from "react";
import { UserContext } from "../../../hooks/useAuth";
import style from "./UserIcon.module.css";
import { Link } from "react-router-dom";
import { logOut } from "../../authorization";
import { DropDownBtn } from "../../../utils";
import { User } from "../../../model/user";
import { CgProfile } from "react-icons/cg";
import { LiaUserEditSolid } from "react-icons/lia";
import { GrUserSettings } from "react-icons/gr";
import { TbUserShield } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";

const UserDropDownMenu = () => {
  return (
    <>
      <span className={style.links}>
        <Link to="#">
          <CgProfile />
          <span>My Profile</span>
        </Link>
      </span>
      <span className={style.links}>
        <Link to="#">
          <LiaUserEditSolid />
          Edit Profile
        </Link>
      </span>
      <span className={style.links}>
        <Link to="#">
          <GrUserSettings />
          Account Settings
        </Link>
      </span>
      <span className={style.links}>
        <Link to="#">
          <TbUserShield />
          Privacy Settings
        </Link>
      </span>
      <span onClick={logOut} className={style.logout}>
        <span>
          <AiOutlineLogout />
          Logout
        </span>
      </span>
    </>
  );
};

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className={style.user_icon}>
      <img className={style.image} src={user.imageUrl} alt="user profile pic" />
      <div className={style.data}>{user.name}</div>
    </div>
  );
};

export const UserIcon = ({ className }: { className?: string }) => {
  const user = useContext(UserContext);
  return (
    <DropDownBtn
      dropDownMenuClass={style.alignLeft}
      dropDown={<UserProfile user={user} />}
      dropDownMenu={<UserDropDownMenu />}
      type="userIcon"
    />
  );
};
