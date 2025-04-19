import { useEffect, useRef, useState } from "react";
import CardList from "../../Components/CardList/CardList";

import "firebase/firestore";
import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path to your store file
import { fetchUsers } from "../../slices/UserSlice/UserSlice";
import ModalFilter from "../../Components/ModalFilter/ModalFilter";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0);

  const {
    isLoading,
    modalIsShow,
    categoryFilter,
    cityFilter,
    lastVisible,
    currentPage,
    items,
    filteredItems,
  } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        lastVisible,
      })
    );
  }, [currentPage, counter]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Observer элемент появился внизу экрана!");
            // Здесь можно вызвать дополнительную логику, например, подгрузку данных
            console.log("INTERSECTING");
            setTimeout(() => {
              setCounter((i) => i + 1);
            }, 200);
            console.log(currentPage, "currentPage");
          }
        });
      },
      {
        root: null, // Отслеживаем относительно viewport
        rootMargin: "0px", // Отступы
        threshold: 0.1, // Полностью видимый элемент
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  }, []);

  if (isLoading) <Spinner />;
  return (
    <div className="min-h-screen">
      <div>
        <CardList data={items} />
        <ModalFilter isShow={modalIsShow} />

        <div ref={observerRef} className="observer h-20 w-full bg-inherit">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
