import style from './AddNewNote.module.css';
import { Link } from "react-router-dom";
import { GenericDropDown } from "../utils/genericDrawDown";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { RiTodoLine } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg';
import {IoSyncSharp } from 'react-icons/io5';

const UserDropDownMenu = () => {
  return (
    <>
      <span className={style.links}>
        <Link to="#"><LiaStickyNoteSolid/>Blank Notes</Link>
      </span>
      <span className={style.links}>
        <Link to="#"><RiTodoLine/>To-do</Link>
      </span>
      <span className={style.links}>
        <Link to="#"><CgNotes/>Essay Notes</Link>
      </span>
      <span className={style.links}>
        <Link to="#"><IoSyncSharp/>Daily Reflection</Link>
      </span>
    </>
  );
};


const UserDropDownTitle = () => {
    return (
      <>
        <span className={style.dropdown}><span>+</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Notes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&darr;</span></span>
      </>
    )
}

export const AddNewNote = ({className}: {className?: string}) => {
    return (
            <GenericDropDown dropDown={<UserDropDownTitle/>} dropDownMenu={<UserDropDownMenu/>} type="addNotes"/>
    )
}