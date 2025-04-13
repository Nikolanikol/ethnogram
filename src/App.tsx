import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Router/router.tsx";
import Header from "./Components/Header/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
{
}

export default App;
