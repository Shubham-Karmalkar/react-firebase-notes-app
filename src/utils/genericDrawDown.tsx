import { useEffect, useRef, useState } from 'react';
import style from './genericDrawDown.module.css';


export const GenericDropDown = ({dropDown, dropDownMenu,type, dropDownMenuClass}: {dropDown?: JSX.Element, dropDownMenu?:JSX.Element, type:string, dropDownMenuClass?:any}) => {
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLSpanElement>(null);
  
  const handleOutsideClick = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setChecked(() => false);
    }
  };

  const handleClick = (e: any) => {
    setChecked(val => !val);
  };

  const onNavClick = (e:any) => {
    const nestedDropDown = navRef.current?.getElementsByClassName(style.user_icon) || [];
    for(let i = 0 ; i<nestedDropDown.length; i++) {
      if (nestedDropDown[i].contains(e.target)) return;
    }
    setChecked(false);
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return ()=> {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, []);
  return (
      <div className={style.user_icon} ref={inputRef} >
        <input checked={checked} type="checkbox" name="userIcon" id={type} />
        <label className={style.user_name_pic} htmlFor={type}>
        </label>
        <div onClick={handleClick}>
          {dropDown}
        </div>
        <span ref={navRef} onClick={onNavClick} className={`${style.dropdown} ${dropDownMenuClass}`}>{dropDownMenu}</span>
      </div>
    );
}

export const createGenericDropDown = (
  type: string,
  dropDown?: JSX.Element,
  dropDownMenu?: JSX.Element,
  dropDownMenuClass?: any
) => {

  <GenericDropDown type={type} dropDown={dropDown} dropDownMenu={dropDownMenu} dropDownMenuClass={dropDownMenuClass} />;
};