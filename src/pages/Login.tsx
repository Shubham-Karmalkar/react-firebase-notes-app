import styles from "./Login.module.css";
import brand_logo from '../resource/logo.png';
import { useState } from "react";
import { LogInWithGoogle, LogInWithCredentials } from "../components/authorization";
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SUCCESS_REDIRECT = "/";

const PageTitle = () => {
  return (
    <div className={styles.page_head}>
      <img src={brand_logo} className={styles.brand_logo}/>
      <div className={styles.page_title}>Log in</div>
    </div>
  );
};

const UserCreds = ({email, password, onChange}: UserCred) => {
  return (
    <div className={styles.cred_container}>
      <input className={styles.input_fields} type="email" value={email} placeholder="Email" onChange={(e) => onChange("email", e.target.value)}/>
      <input className={styles.input_fields} type="password" value={password} placeholder="Password" onChange={(e) => onChange("password", e.target.value)}/>
    </div>
  );
};

const LoginOptions = ({email, password, callback}: {email: string, password: string, callback:any}) => {
  return (
    <div>
      <LogInWithCredentials email={email} password={password} callback={callback}/>
      <LogInWithGoogle callback={callback}/>
    </div>
  );
};

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]  = useState("");
    const navigate = useNavigate();

    function setData(type: "email" | "password", value: string) {
        if(type === "email"){
            return setEmail(value);
        }
        setPassword(value);
    }

    const loginStatusChange = async (obj: {status:boolean, response?:UserCredential, message?:string}) => {
      if(!obj.status){
        return alert(obj.message);
      }
      navigate(SUCCESS_REDIRECT);
    }

    return (
    <div className={styles.container}>
      <div className={styles.body}>
        <PageTitle/>
        <UserCreds email={email} password={password} onChange={setData}/>
        <LoginOptions email={email} password={password} callback={loginStatusChange}/>
      </div>
    </div>
  );
};


type UserCred = {
  email: string;
  password: string;
  onChange: (type: "email" | "password", value: string) => void;
};