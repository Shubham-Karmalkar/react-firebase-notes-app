import { logOut } from '../components/authorization';
import style from './Home.module.css';

export const Home = () => {
    return (
        <div className={style.input_container}>
            <span className={style.placeholder}>Email</span>
            <input className={style.input_tag} type="text" />
            <button onClick={logOut}>log out</button>
        </div>
    )
}