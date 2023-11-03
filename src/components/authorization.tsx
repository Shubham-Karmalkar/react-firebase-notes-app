import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import styles from "./authorization.module.css"
import { useEffect, useState } from "react";

const GoogleTemplate = ({text, onClick}:{text: string, onClick: any}) => {

  return (
      <div className={styles.content_wrapper} onClick={onClick}>
        <div className={styles.google_icon_wrapper}>
          <img
            className={styles.google_icon}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className={styles.btn_text}>
          <b>{text}</b>
        </p>
      </div>
  );
};

export const LogInWithGoogle = ({callback}:{callback:any}) => {

    const onClickLogIn = async () => {
        try {
            const logRes = await signInWithPopup(auth, googleProvider);
            console.log(logRes)
            callback({status: true, repsonse: logRes});
        } catch(e: any) {
            let message = getErrorMessage(e);
            callback({status: false, message})
        }
    }
    return(
            <GoogleTemplate text="Log in With Google" onClick={onClickLogIn}/>
    )
};
 
export const SignUpWithGoogle = ({callback}:{callback:any}) => {
    const onClickSignUp = async () => {
        try {
            const logRes = await signInWithPopup(auth, googleProvider);
            callback({status: true, repsonse: logRes});
        } catch(e: any) {
            let message = getErrorMessage(e);
            callback({status: false, message})
        }
    }
    return(
        <>
            <GoogleTemplate text="Sign in With Google" onClick={onClickSignUp}/>
        </>
    )
};

export const LogInWithCredentials = ({email, password, callback}: {email: string, password: string, callback:any}) => {
    const logIn = async () => {
      try {
        const logInRes = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        callback({status: true, response: logInRes});
      } catch (e: any) {
        let message = getErrorMessage(e);
        callback({status: false, message});
      }
    };
    return (
        <div className={styles.log_in_btn} onClick={logIn}><b>Log in</b></div>
    )
};

export const SignUpWithCredentials = ({email, password, confPassword, callback}: {email: string, confPassword: string, password: string, callback: any}) => {
    const signUp = async () => {
      if (password !== confPassword)
        return callback({ status: false, message: "Password did not Match" });
      try {
        const logInRes = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        callback({ status: true, repsonse: logInRes });
      } catch (e: any) {
        let message = getErrorMessage(e);
        callback({ status: false, message });
      }
    };
    return (
        <div className={styles.log_in_btn} onClick={signUp}><b>Sign Up</b></div>
    )
};

export const logOut = async() => {
  await signOut(auth);
}


function getErrorMessage(error:{code: string, message: string}) {
  switch (error.code) {
    case "auth/invalid-login-credentials":
      return "Invalid Email or Password";
    case "auth/missing-password":
      return "Password can not be empty";
    case "auth/invalid-email":
        return "Invalid Email"
    case "auth/email-already-in-use":
        return "Email is already registered with another user"
    default:
      console.log("Error: ", error.code, error.message);
      return "Oops Something went Wrong";
  }
}

