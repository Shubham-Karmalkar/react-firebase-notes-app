import style from "./WriteNoteBar.module.css";
import { BiPencil } from "react-icons/bi";
import {LiaFolder} from "react-icons/lia";
import {FiMoreVertical} from 'react-icons/fi';
import { DropDownBtn } from "../utils";
import {AiOutlineHeart, AiOutlinePushpin} from 'react-icons/ai';
import {GoTrash} from 'react-icons/go';
import { Link } from "react-router-dom";


const DropDownContent = () => {
    return (
        <>
        <span className={style.moreLinks}><Link to="#"><AiOutlineHeart/><span>Add To Favourite</span></Link></span>
        <span className={style.moreLinks}><Link to="#"><AiOutlinePushpin/><span>Mark As Pin</span></Link></span>
        <span className={style.moreLinks}><Link to="#"><GoTrash/><span>Move to Trash</span></Link></span>
        </>
    )
}

const ClickedData = () => {
  return (
    <div className={style.clicked}>
      <div>
        <LiaFolder />
        <span>Folder</span>
      </div>
      <div>
        <span>Share</span>
        <DropDownBtn dropDownMenuClass={style.dropdownMenu} dropDown={<FiMoreVertical className={style.icon}/>} dropDownMenu={<DropDownContent/>} type="createBar"/>
      </div>
    </div>
  );
};

const NotClickedData = () => {
  return (
    <div className={style.noclick}>
      <BiPencil />
      <span>Write Your Note</span>
    </div>
  );
};

export const WriteNoteBar = ({clicked, setClicked}: {clicked:boolean, setClicked:any}) => {
  return (
    <div className={`${style.writeNoteBar} ${clicked ? style.padding_update : ""}`} onClick={() => setClicked(true)}>
      {clicked ? <ClickedData /> : <NotClickedData />}
    </div>
  );
};
