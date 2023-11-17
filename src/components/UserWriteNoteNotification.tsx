import style from './UserWriteNoteNotification.module.css';
import { UserNotificationIcons } from "./UserNotificationIcons";
import { WriteNoteBar } from "./WriteNoteBar";
import { TextEditor } from './TextEditor';
import { useContext, useState } from 'react';
import { SimpleNote } from '../model/notes';
import { UserContext } from '../hooks/useAuth';

export const UserWriteNoteNotification = () => {
  const [clicked, setClicked] = useState(false);
  const user = useContext(UserContext);

  const onClickCloseEditor = () => {
    setClicked(false);
  }

  const onClickSaveNote = (noteData:object[]) => {
    let note = new SimpleNote(noteData, user.email);
    note.save();
    onClickCloseEditor();
  }

  return (
    <>
    <div className={style.container}>
      <WriteNoteBar clicked={clicked} setClicked={setClicked} />
      <UserNotificationIcons className={style.notification} />
    </div>
      {clicked ? <TextEditor className={style.textEditor} onClose={onClickCloseEditor} onSave={onClickSaveNote}/> : ""}
    </>
  );
};
