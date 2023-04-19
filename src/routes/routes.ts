import LoginPage from "../pages//Auth/Login";
import AdminPage from "../pages/Admin";
import RegisterPage from "../pages/Auth/Register";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";

import HeaderOnLy from "../layouts/HeaderOnly";

interface IRoute {
  path: string;
  component: any;
  layout?: any;
  private?: boolean;
}

export const publicRoutes: IRoute[] = [
  {
    path: "/",
    component: HomePage,
    layout: HeaderOnLy,
  },
  {
    path: "/login",
    component: LoginPage,
    layout: null,
  },
  {
    path: "/register",
    component: RegisterPage,
    layout: null,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export const protectedRoutes: IRoute[] = [
  {
    path: "/admin",
    component: AdminPage,
    layout: null,
  },
];
