import { useEffect, useState } from "react";
import "./App.css";
import { UserProfile } from "./Components/Card/TypeCard.tsx";
import CardList from "./Components/CardList/CardList.tsx";
import Service from "./service/index.tsx";
function App() {
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
