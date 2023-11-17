import styles from "./Login.module.css";
import brand_logo from '../resource/logo.png';
import { useState } from "react";
import { SignUpWithCredentials, SignUpWithGoogle } from "../components/authorization";
import { UserCredential } from "firebase/auth";


const PageTitle = () => {
  return (
    <div className={styles.page_head}>
      <img src={brand_logo} className={styles.brand_logo}/>
      <div className={styles.page_title}>Sign Up</div>
    </div>
  );
};

const UserCreds = ({email, password,confirm, onChange}: UserCred) => {
  return (
    <div className={styles.cred_container}>
      <input className={styles.input_fields} type="email" value={email} placeholder="Email" onChange={(e) => onChange("email", e.target.value)}/>
      <input className={styles.input_fields} type="password" value={password} placeholder="Password" onChange={(e) => onChange("password", e.target.value)}/>
      <input className={styles.input_fields} type="password" value={confirm} placeholder="Confirm Password" onChange={(e) => onChange("confirm", e.target.value)}/>
    </div>
  );
};

const LoginOptions = ({email, password, confirm, callback}: {email: string, confirm: string, password: string, callback:any}) => {
  return (
    <div>
      <SignUpWithCredentials email={email} password={password} confPassword={confirm} callback={callback}/>
      <SignUpWithGoogle callback={callback}/>
    </div>
  );
};

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]  = useState("");
    const [confPassword, setConfPassword]  = useState("");

    function setData(type: "email" | "password" | "confirm", value: string) {
        if(type === "email"){
            return setEmail(value);
        } else if (type === "password"){
            return setPassword(value);
        }
        setConfPassword(value);
    }

    const loginStatusChange = async (obj: {status:boolean, response?:UserCredential, message?:string}) => {
        if(!obj.status){
        return alert(obj.message);
      }
    }

    return (
    <div className={styles.container}>
      <div className={styles.body}>
        <PageTitle/>
        <UserCreds email={email} password={password} confirm={confPassword} onChange={setData}/>
        <LoginOptions email={email} password={password} confirm={confPassword} callback={loginStatusChange}/>
      </div>
    </div>
  );
};


type UserCred = {
  email: string;
  password: string;
  confirm: string;
  onChange: (type: "email" | "password" | "confirm", value: string) => void;
};