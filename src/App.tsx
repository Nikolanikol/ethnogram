import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes, routes } from "./Router/router.tsx";
import Header from "./Components/Header/Header.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store.tsx";

function App() {
  const { user, loading, error, confirmationResult } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(confirmationResult);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!(user && user.uid)
          ? publicRoutes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))
          : routes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
      </Routes>
    </BrowserRouter>
  );
}
{
}

export default App;
