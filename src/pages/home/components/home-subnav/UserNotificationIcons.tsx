import style from "./UserNotificationIcons.module.css";
import { DropDownBtn } from "../../../../utils";
import { FiMail } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Message = ({ count }: { count?: number }) => {
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
};

const MessageContent = () => {
  return <></>;
};

const Notification = ({ count }: { count?: number }) => {
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
};

export const UserNotificationIcons = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`${style.useNotificationContainer} ${className}`}>
      <DropDownBtn dropDown={<Message count={4} />} dropDownMenu={<MessageContent />} type="message" />
      <DropDownBtn dropDown={<Notification count={2} />} dropDownMenu={<MessageContent />} type="message" />
    </div>
  );
};
