import NoAuth from "@/Pages/NoAuth/NoAuth";
import About from "../Pages/About/About";
import Catalog from "../Pages/Catalog/Catalog";
import Login from "../Pages/Login/Login";

interface Route {
  path: string;
  component: React.ReactNode;
  exact: boolean;
}
interface Link {
  path: string;
  name: string;
}
export const routes: Route[] = [
  {
    path: "/",
    component: <Catalog />,
    exact: true,
  },
  {
    path: "/about",
    component: <About />,
    exact: true,
  },
  //   {
  //     path: "/login",
  //     component: <Login />,
  //     exact: true,
  //   },
];
export const publicRoutes: Route[] = [
  {
    path: "/",
    component: <NoAuth />,
    exact: true,
  },
  {
    path: "/about",
    component: <About />,
    exact: true,
  },
  //   {
  //     path: "/login",
  //     component: <Login />,
  //     exact: true,
  //   },
];
export const links: Link[] = [
  {
    path: "/",
    name: "Мой каталог",
  },
  {
    path: "/about",
    name: "О нас",
  },
  //   {
  //     path: "/login",
  //     name: "Войти",
  //   },
];
