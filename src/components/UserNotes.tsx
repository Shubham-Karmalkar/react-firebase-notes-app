import { useContext, useEffect, useState } from 'react';
import { ActiveEffectBtn } from '../utils/Buttons';
import style from './UserNotes.module.css';
import { SimpleNote, NoteTypes } from '../model/notes';
import { NoteCard } from './NoteCard';
import { UserContext } from '../hooks/useAuth';
import noDataImg from '../resource/no_data.jpg';


const ColorArr = [
    "#87baf5",
    "#aa87f5",
    "#f0864a",
    "#f674ad",
    "#1f1c2f",
    "#8ac3a3",
];

const NotesNavBar = ({currentPgeId, setCurrentPage}: {currentPgeId:NoteTypes, setCurrentPage:any}) => {
    const btns: {pageId:NoteTypes, child:string}[] = [
        {
            pageId:"all",
            child:"All",
        },
        {
            pageId:"shared",
            child:"Shared Notes",
        },
        {
            pageId:"pinned",
            child:"Pin Notes",
        },
        {
            pageId:"favourite",
            child:"Favourite Notes",
        },
    ]
    function onClick(id:any)  {
        setCurrentPage(id);
    }
    return (
        <div className={style.notesNav}>
            {btns.map((btn:any) => {
                let {child, ...obj} = btn;
                obj = {...obj, className: style.btn, activeClass:style.active,currentPgeId,onClick}
                return <ActiveEffectBtn {...obj} >{child}</ActiveEffectBtn>
            })}
        </div>
    )
}

export const UserNotes = () => {
    const [currentPage, setCurrentPage] = useState<NoteTypes>("all");
    const [notes, setNotes] = useState(new SimpleNote());
    const user = useContext(UserContext);
    
    useEffect(() => {
        notes.getAllUserNotes(user.email).then(() => {
            let objNotes = notes.asObj();
            let newNoteInstance = new SimpleNote();
            newNoteInstance.createNoteByObj(objNotes);
            newNoteInstance._all = notes._all;
            setNotes(newNoteInstance);
        });
    }, []);

    const noteCards = !notes._all  ? (<div className={style.emptyNotes}><img src={noDataImg} alt='no data present'/></div>) : notes._all.map((note,index) => {
        const colorIndex = index ? index % ColorArr.length : index; 
        return <NoteCard note={note} color={ColorArr[colorIndex]}/>;
    })

    return (
        <div className={style.userNotesContainer}>
            <span>Your Notes</span>
            <NotesNavBar currentPgeId={currentPage} setCurrentPage={setCurrentPage}/>
            <div className={style.notesList}>
                {noteCards}
            </div>
        </div>
    )
}