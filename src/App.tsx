import { auth} from "./config/firebase";
import { LandingPage } from "./pages/LandingPage";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SIgnUp";
import { Home } from "./pages/Home";
import { useAuthUser, UserContext } from "./hooks/useAuth";
import { CustomRoutes, AuthRoute } from "./hooks/authRoute";

// https://templates.iqonic.design/note-plus/html/backend/auth-sign-up.html
// https://templates.iqonic.design/note-plus/html/backend/index.html

function App() {
  const [user] = useAuthUser(auth);
  console.log(user);
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <CustomRoutes>
          <AuthRoute path="/" element={<LandingPage />} isAuth={true} authRedirect="/dashboard" />
          <AuthRoute path="/dashboard" element={<Home />} isAuth={true} nonAuthPath="/" />
          <AuthRoute path="/login" element={<Login />} isAuth={true} authRedirect="/dashboard" />
          <AuthRoute path="/signUp" element={<SignUp />} isAuth={true} authRedirect="/dashboard" />
        </CustomRoutes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
