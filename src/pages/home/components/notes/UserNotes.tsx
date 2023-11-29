import { useContext, useEffect, useState } from 'react';
import { ActiveEffectBtn } from '../../../../utils/Buttons';
import style from './UserNotes.module.css';
import { SimpleNote, NoteTypes, SimpleNotesList, SimpleNoteListContext } from '../../../../model/notes';
import { NoteCard } from './NoteCard';
import { UserContext } from '../../../../hooks/useAuth';
import noDataImg from '../../../../resource/no_data.jpg';
import { SetState } from '../../../../utils';


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

export const UserNotes = ({setUpdateNote}:{ setUpdateNote?: SetState<SimpleNote>}) => {
    const [currentPage, setCurrentPage] = useState<NoteTypes>("all");
    const [notes, setNotes] = useContext(SimpleNoteListContext);
    const user = useContext(UserContext);

    const notesUpdater = () => {
        const newNoteInstance = new SimpleNotesList();
        newNoteInstance._all = notes._all;
        setNotes(newNoteInstance);
    }

    const deleteNote = (id: string) => {
        console.log("delete id: ", id);
        notes.deleteNoteById(id).then(notesUpdater);
    }
    
    useEffect(() => {
        notes.getAllUserNotes(user.email).then(notesUpdater);
    }, []);


    const filteredNotes = notes._all && notes._all.length > 0 &&  notes.filterNote(currentPage);

    const noteCards = !(filteredNotes && filteredNotes.length)  ? (<div className={style.emptyNotes}><img src={noDataImg} alt='no data present'/></div>) : filteredNotes.map((note,index) => {
        const colorIndex = index ? index % ColorArr.length : index; 
        return <NoteCard note={note} key={note.id} color={ColorArr[colorIndex]} onDelete={deleteNote}/>;
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