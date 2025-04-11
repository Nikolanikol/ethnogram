import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/index.tsx";
import Card from "./Components/Card/Card.tsx";
import { UserProfile } from "./Components/Card/TypeCard.tsx";
import CardList from "./Components/CardList/CardList.tsx";
import Service from "./service/index.tsx";
function App() {
  const [count, setCount] = useState(0);
  const [cardsData, setCardsData] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Service.getUsersCards()
      .then((res) => setCardsData(res as UserProfile[]))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
    console.log("Data fetched successfully");
  }, []);
  console.log("helo");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CardList data={cardsData} />
    </>
  );
}

export default App;
