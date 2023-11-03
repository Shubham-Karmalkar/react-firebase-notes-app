import { NavBar } from '../components/NavBar';
import style from './LandingPage.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../hooks/useAuth';
import { useContext } from 'react';

export const LandingPage = () => {
    return (
        <div>
            <NavBar/>
        </div>
    );
}