import style from './UserWriteNoteNotification.module.css';
import { UserNotificationIcons } from "./UserNotificationIcons";
import { WriteNoteBar } from "./WriteNoteBar";
import { TextEditor } from '../../../../components/editor/TextEditor';
import { useContext, useRef, useState } from 'react';
import { SimpleNote, SimpleNoteContext, SimpleNoteListContext, SimpleNotesList } from '../../../../model/notes';
import { UserContext } from '../../../../hooks/useAuth';

export const UserWriteNoteNotification = () => {
  const [clicked, setClicked] = useState(false);
  const user = useContext(UserContext);
  const ref = useRef<HTMLDivElement>(null);
  const [updateNote, setUpdateNote] = useContext(SimpleNoteContext);
  const [notesList, setNotesList] = useContext(SimpleNoteListContext);

  if(updateNote){
    ref.current?.scrollIntoView({behavior:'smooth'});
  }

  const onClickCloseEditor = () => {
    if(updateNote) setUpdateNote(null as any);
    setClicked(false);
  }

  const onClickSaveNote = async (noteData:object[]) => {
    if (updateNote) {
      const newUpdate = updateNote;
      newUpdate.data = [...noteData];
      await newUpdate.update()
      const newNotesList = new SimpleNotesList();
      newNotesList._all = notesList._all.map((note:SimpleNote) => {
        if(note.id === newUpdate.id){
          note.data = [...noteData];
        }
        return note;
      });
      setNotesList(newNotesList);
      onClickCloseEditor();
    } else {
      const note = new SimpleNote(noteData, user.email);
      note.save();
      const newNotesList = new SimpleNotesList();
      newNotesList._all = notesList._all.map(obj => obj);
      newNotesList._all.push(note);
      setNotesList(newNotesList);
      onClickCloseEditor();
    }
  }

  return (
    <>
    <div className={style.container} ref={ref}>
      <WriteNoteBar clicked={clicked} setClicked={setClicked} />
      <UserNotificationIcons className={style.notification} />
    </div>
      {clicked || updateNote ? <TextEditor content={updateNote?.data} className={style.textEditor} onClose={onClickCloseEditor} onSave={onClickSaveNote}/> : ""}
    </>
  );
};
