import style from './NoteCard.module.css';
import { SimpleNote, SimpleNoteContext } from '../../../../model/notes';
import { TfiMoreAlt } from "react-icons/tfi";
import {LiaEye} from 'react-icons/lia';
import { SlPencil } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DropDownBtn } from '../../../../utils';
import { Link } from 'react-router-dom';
import { ViewOnlyEditor } from '../../../../components/editor/ViewOnlyEditor';
import { FiUsers } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { BiCalendar } from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from 'react';
import { RxCross1 } from "react-icons/rx";


const MoreOptions = ({onDelete, setUpdateNote, onView}:{onDelete:any, setUpdateNote:any, onView:any}) => {
    return (
        <>
            <Link to="#" className={style.links} onClick={onView}><LiaEye/><span>View</span></Link>
            <Link to="#" className={style.links} onClick={setUpdateNote}><SlPencil/><span>Edit</span></Link>
            <Link to="#" className={style.links} onClick={onDelete}><RiDeleteBin5Line/><span>Delete</span></Link>
        </>
    )
}


export const NoteCard = ({note, onDelete, color="red"}:{note:SimpleNote, onDelete:any, color?: string}) => {
    const colorRef = useRef<HTMLDivElement>(null);
    const [currentColor, setCurrentColor] = useState(color);
    const [updateNote, setUpdateNote] = useContext(SimpleNoteContext);
    const [isView, setIsView] = useState(false);
    
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

    const scrollToSection = () => {
        setTimeout(() => {
            colorRef.current?.scrollIntoView({behavior:'smooth'});
        }, 1000);
    }

    const setNoteTobeUpdated = () => {
        setUpdateNote(note);
    }

    const onCancle = () => {
        setIsView(false);
        scrollToSection()
    }

    const onView = async () => {
        setIsView(true)
        scrollToSection();
    }

    const deleteNote = () => {
        onDelete(note.id);
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

   const moreIcon = isView ? <RxCross1 onClick={onCancle} {...textColorClass}/> : <TfiMoreAlt {...textColorClass} />;

   return (
        <div className={`${style.noteCard} ${isView ? style.bigView: ""}`} style={{borderBottom:`5px solid ${color}`}} ref={colorRef}>
            <DropDownBtn
             dropDownMenuClass={style.dropDown} 
             dropDown={moreIcon} 
             dropDownMenu={<MoreOptions onView={onView} onDelete={deleteNote} setUpdateNote={setNoteTobeUpdated}/>} 
             type={note.id}/>
            <div className={`${style.quillContainer}`} {...textColorClass}>
                <ViewOnlyEditor content={note.data}/>
            </div>
            <div className={style.lowerCard}>
                <div>{userIcon}<span {...textColorClass}>{userText}</span></div>
                <div><BiCalendar {...colorClass}/><span {...textColorClass}>{localDate}</span></div>
            </div>
        </div>
    )
}