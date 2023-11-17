import style from './NoteCard.module.css';
import { SimpleNote } from '../model/notes';
import { TfiMoreAlt } from "react-icons/tfi";
import {LiaEye} from 'react-icons/lia';
import { SlPencil } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GenericDropDown } from '../utils/genericDrawDown';
import { Link } from 'react-router-dom';
import { ViewOnlyEditor } from './ViewOnlyEditor';
import { FiUsers } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { useEffect, useRef, useState } from 'react';


const MoreOptions = () => {
    return (
        <>
            <Link to="#" className={style.links}><LiaEye/><span>View</span></Link>
            <Link to="#" className={style.links}><SlPencil/><span>Edit</span></Link>
            <Link to="#" className={style.links}><RiDeleteBin5Line/><span>Delete</span></Link>
        </>
    )
}


export const NoteCard = ({note, color="red"}:{note:SimpleNote, color?: string}) => {
    const colorRef = useRef<HTMLDivElement>(null);
    const [currentColor, setCurrentColor] = useState("");
    
    const colorClass = {
        style: {
            color: currentColor
        }
    }
    const textColorClass = {
        style: {
            color: color === currentColor ? "" : currentColor
        }
    }

    useEffect(() => {
        let colorReference:any = colorRef.current;
        
        const handleEnter = () => {
            colorReference?.setAttribute("style", `background-color: ${color}; border-bottom: 5px solid ${color};`)
            setCurrentColor("white");
        }
        const handleLeave = () => {
            colorReference?.setAttribute("style", `border-bottom: 5px solid ${color};`)
            setCurrentColor(color);
        }
        if(color && colorRef.current) {
            colorReference.addEventListener("mouseenter", handleEnter)
            colorReference.addEventListener("mouseleave", handleLeave)
        }

        return () => {
            colorReference?.removeEventListener("mouseenter", handleEnter)
            colorReference?.removeEventListener("mouseleave", handleLeave)
        }
    }, []);

   const userIcon = note?.sharedUsers?.length ? <FiUsers {...colorClass} /> : <LuUser {...colorClass}/> ;
   const userText = note?.sharedUsers?.length ? `${note.sharedUsers.length} Share` : "Only You" ;
   const localDate = (note?.updatedAt ? new Date(note.updatedAt) : new Date()).toLocaleDateString();

   return (
        <div className={style.noteCard} style={{borderBottom:`5px solid ${color}`}} ref={colorRef}>
            <GenericDropDown dropDownMenuClass={style.dropDown} dropDown={<TfiMoreAlt {...textColorClass} />} dropDownMenu={<MoreOptions/>} type={note.id}/>
            <div className={style.quillContainer} {...textColorClass}>
                <ViewOnlyEditor content={note.data}/>
            </div>
            <div className={style.lowerCard}>
                <div>{userIcon}<span {...textColorClass}>{userText}</span></div>
                <div><BiCalendar {...colorClass}/><span {...textColorClass}>{localDate}</span></div>
            </div>
        </div>
    )
}