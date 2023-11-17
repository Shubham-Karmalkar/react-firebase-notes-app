import style from "./UserNotificationIcons.module.css";
import { GenericDropDown } from "../utils/genericDrawDown"
import {FiMail} from "react-icons/fi";
import {IoNotificationsOutline} from "react-icons/io5";
import { Link } from "react-router-dom";

const Message = ({count}:{count?:number}) => {
    return (
      <>
        <span className={style.icons}>
          <Link to="#">
            <FiMail />
            {count ? <span>{count}</span> : ""}
          </Link>
        </span>
      </>
    );
}

const MessageContent = () => {
    return (
        <></>
    )
}

const Notification = ({count}: {count?: number}) => {
    return (
      <>
        <span className={style.icons}>
          <Link to="#">
            <IoNotificationsOutline />
            {count ? <span>{count}</span> : ""}
          </Link>
        </span>
      </>
    );
}

export const UserNotificationIcons = ({className=""}:{className?:string}) => {
    return (
        <div className={`${style.useNotificationContainer} ${className}`}>
           <GenericDropDown dropDown={<Message count={4}/>} dropDownMenu={<MessageContent/>} type="message"/>
           <GenericDropDown dropDown={<Notification count={2}/>} dropDownMenu={<MessageContent/>} type="message"/>
        </div>
    )
}