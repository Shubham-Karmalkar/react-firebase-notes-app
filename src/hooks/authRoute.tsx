import { Navigate, Route, Routes} from "react-router-dom";
import { UserContext } from "./useAuth";
import { useContext } from "react";

const CustomRedirector = ({Element, isAuth, nonAuthPath, authRedirect}:{Element: any, isAuth?: boolean, nonAuthPath?: string, authRedirect?:string }) => {
  const user = useContext(UserContext);
  if (!isAuth) return Element;
  console.log("customerRedirector: ", user, isAuth, nonAuthPath, authRedirect);
  if (!user && nonAuthPath) return <Navigate to={nonAuthPath} />;
  if(!user) return Element;
  if (authRedirect) return <Navigate to={authRedirect} />;
  return Element;
}

export const CustomRoutes = ({ children }: { children: any }) => {
  console.log(children);

  return (
    <Routes>
      {children.map((child: any) => {
        return (
          <Route
            path={child.props.path}
            element={
              <CustomRedirector
                Element={child.props.element}
                isAuth={child.props.isAuth}
                nonAuthPath={child.props.nonAuthPath}
                authRedirect={child.props.authRedirect}
              />
            }
          />
        );
      })}
    </Routes>
  );
};

export const AuthRoute = ({ path, element, isAuth, nonAuthPath, authRedirect }: { path: string; element: any, isAuth?: boolean, nonAuthPath?: string, authRedirect?:string }) => {
  return <></>
};