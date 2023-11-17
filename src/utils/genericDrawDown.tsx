import { useEffect, useRef, useState } from 'react';
import style from './genericDrawDown.module.css';


export const GenericDropDown = ({dropDown, dropDownMenu,type, dropDownMenuClass}: {dropDown?: JSX.Element, dropDownMenu?:JSX.Element, type:string, dropDownMenuClass?:any}) => {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  
  const handleOutsideClick = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setChecked(() => false);
    }
  };

  const handleClick = () => {
    setChecked((val) => !val);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return ()=> {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, []);
  return (
      <div className={style.user_icon} ref={inputRef} >
        <input checked={checked} onChange={handleClick} type="checkbox" name="userIcon" id={type} />
        <label className={style.user_name_pic} htmlFor={type}>
          {dropDown}
          <span className={`${style.dropdown} ${dropDownMenuClass}`}>{dropDownMenu}</span>
        </label>
      </div>
    );
}