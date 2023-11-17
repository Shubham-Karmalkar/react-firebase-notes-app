import Quill from "quill";
import { useCallback } from "react";
import "./viewOnlyEditor.css"

export const ViewOnlyEditor = ({content}: {content:any}) => {

    const wrapperRef = useCallback((element: HTMLDivElement) => {
        if (!element) return;
        element.innerHTML = "";
        const editor = document.createElement('div');
        element.append(editor);
        const q = new Quill(editor, {theme: "snow", modules:{
            toolbar: false
        }});
        q.setContents(content);
        q.disable();

    }, []);

    return <div className="viewOnlyContainer" ref={wrapperRef}></div>;
}