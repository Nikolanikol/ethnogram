import "./App.css";
import { BrowserRouter, data, Route, Routes } from "react-router-dom";
import { publicRoutes, routes } from "./Router/router.tsx";
import Header from "./Components/Header/Header.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store.tsx";
import { db } from "./firebase/index.tsx";

async function getUsersCards(limit: number = 10) {
  try {
    let query1 = db.collection("cats").limit(limit);

    // Если передан последний видимый документ, начинаем после него
    const data = (await query1.get()).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(data);
    // let data = query1.get().docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));

    //   Возвращаем данные и последний видимый документ для следующей страницы

    return data;
  } catch (error) {
    console.error("Ошибка получения документов:", error);
    throw error;
  }
}

function App() {
  const { user, loading, error, confirmationResult } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(getUsersCards(10000));
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
