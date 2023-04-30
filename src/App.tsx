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
import { fetchUser, loginSuccess } from "./store/authSlice";
import { AppDispatch, RootState } from "./store/store";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const currentRoute = [...publicRoutes, ...protectedRoutes].find(
    (route) => route.path === location.pathname
  );

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      dispatch(loginSuccess(token));
      navigate(currentRoute?.path || "/");
    } else if (
      protectedRoutes.some((route) => route.path === location.pathname)
    ) {
      navigate("/login");
    }
  }, [token, currentRoute]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  // dont redirect to login page when user is authenticated
  if (
    (isAuthenticated && location.pathname === "/login") ||
    (isAuthenticated && location.pathname === "/register")
  ) {
    return <Navigate to='/' />;
  }

  // if user is admin, can admin page , else redirect to home page
  const isAdmin = user && user.role === "ADMIN";

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
                  (isAdmin && route.adminOnly) || !route.adminOnly ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/" replace={true} />
                  )
                ) : (
                  <Navigate to="/login" replace={true} />
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
