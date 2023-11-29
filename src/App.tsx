import { auth} from "./config/firebase";
import { LandingPage } from "./pages/landing";
import "./App.css";
import { Login } from "./pages/auth";
import { SignUp } from "./pages/auth";
import { Home } from "./pages/home";
import { useAuthUser, UserContext } from "./hooks/useAuth";
import { CustomRoutes, AuthRoute } from "./hooks/authRoute";


function App() {
  const [user] = useAuthUser(auth);
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
