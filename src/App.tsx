import { useEffect, useState } from "react";
import "./App.css";
import { UserProfile } from "./Components/Card/TypeCard.tsx";
import CardList from "./Components/CardList/CardList.tsx";
import Service from "./service/index.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./Router/router.tsx";
import Header from "./Components/Header/Header.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
