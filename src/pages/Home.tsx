import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase"
import { LandingPage } from "./LandingPage"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from "react";

export const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(loading) return;
        if(!user) return navigate('/about');
    },[user, loading]);
    
    return (
        <div>Home Page</div>
    )
}