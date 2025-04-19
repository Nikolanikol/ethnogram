import { useEffect, useRef, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import firebase from "firebase/app";
import "firebase/firestore";
import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path to your store file
import { fetchUsers, setPage } from "../../slices/UserSlice/UserSlice";
import ModalFilter from "../../Components/ModalFilter/ModalFilter";

import { db } from "@/firebase";
import MyPagination from "@/Components/Pagination/MyPagination";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0);
  async function getUserCategories(
    lastVisible: firebase.firestore.DocumentSnapshot | null = null,
    limit: number = 90,
    city: number = 0,
    category: number = 0
  ) {
    try {
      let query1 = db
        .collection("users")
        .where("cities", "array-contains", city)
        .limit(limit);
      let query2 = db
        .collection("users")
        .where("cities", "array-contains", 0)
        .limit(limit);

      // Если передан последний видимый документ, начинаем после него
      if (lastVisible) {
        query1 = query1.startAfter(lastVisible);
        query2 = query2.startAfter(lastVisible);
      }
      const [querySnapshot1, querySnapshot2] = await Promise.all([
        query1.get(),
        query2.get(),
      ]);

      const data1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const data2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const combinedData = [...data1, ...data2].reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      }, []);
      // Возвращаем данные и последний видимый документ для следующей страницы
      const res = combinedData.filter((item) => {
        return item.categories.includes(category);
      });
      console.log(res, "Отфильтрованные данные");

      return {
        data: res,
        lastVisible:
          querySnapshot1.docs[querySnapshot1.docs.length - 1] || null,
      };
    } catch (error) {
      console.error("Ошибка получения документов:", error);
      throw error;
    }
  }

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

    // return () => {
    //   if (observerRef.current) {
    //     observer.unobserve(observerRef.current);
    //   }
    // };
  }, []);
  console.log(currentPage, "currentPage");
  if (isLoading) <Spinner />;
  return (
    <div className="min-h-screen">
      <div>
        <CardList data={filteredItems} />
        <ModalFilter isShow={modalIsShow} />

        <div ref={observerRef} className="observer h-20 w-full bg-inherit">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
