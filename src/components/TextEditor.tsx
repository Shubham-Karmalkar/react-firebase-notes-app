import './TextEditor.css';
import "quill/dist/quill.snow.css";
import Quill from 'quill';
import { useState, useCallback } from "react";
import defaultEditorData from '../resource/editor-defualt-text.json';

const TOOLBAR_OPTIONS = [
    [{header:[1,2,3,4,5,6,false]}],
    ['bold', 'italic', 'underline', 'strike'],
    [{font: []}],
    [{list: "ordered"}, {list: "bullet"}],
    [{color: []}, {background:[]}],
    [{script: "sub"}, {script: "super"}],
    [{align:[]}],
    ["image", "blockquote", "code-block"], 
    ["clean"]
]

export const TextEditor = ({onClose, onSave, className}: {onClose?:any, onSave?:any, className?:any}) => {

    const [quill, setQuill] = useState<Quill>();

    const wrapperRef = useCallback((element: HTMLDivElement) => {
        if (!element) return;
        element.innerHTML = "";
        const editor = document.createElement('div');
        element.append(editor);
        const q = new Quill(editor, {theme: "snow", modules:{
            toolbar: TOOLBAR_OPTIONS
        }});
        q.setContents(defaultEditorData.ops as any);
        setQuill(q);
    }, []);

    const onSaveClick = (event: any) => {
      onSave(quill?.getContents()?.ops);
    }

    return (
      <div className={`container ${className ? className: ""} `}>
        <div ref={wrapperRef}></div>
        <div className="btns">
          <div onClick={onClose}>Close</div>
          <div onClick={onSaveClick}>Save</div>
        </div>
      </div>
    );
}