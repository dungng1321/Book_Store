import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Loading from "./common/Loading";
import DefaultLayout from "./layouts/DefaultLayout";
import { protectedRoutes, publicRoutes } from "./routes";
import { loginSuccess } from "./store/authSlice";
import { AppDispatch, RootState } from "./store/store";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const currentRoute = [...publicRoutes, ...protectedRoutes].find(
    (route) => route.path === location.pathname
  );

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    token &&
      (dispatch(loginSuccess(token)), navigate(currentRoute?.path || "*"));
  }, [token, currentRoute]);

  // dont redirect to login page when user is authenticated
  if (isAuthenticated && location.pathname === "/login" || isAuthenticated && location.pathname === "/register") {
    return <Navigate to='/' />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {protectedRoutes.map((route, index) => {
          const Page = route.component;
          const Layout = route.layout
            ? route.layout
            : route.layout === null
            ? Fragment
            : DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isAuthenticated ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
