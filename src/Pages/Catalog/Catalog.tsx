import { useEffect, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import firebase from "firebase/app";
import "firebase/firestore";
import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path to your store file
import { fetchUsers, setPage } from "../../slices/UserSlice/UserSlice";
import ModalFilter from "../../Components/ModalFilter/ModalFilter";

import { getCityByFilter } from "@/utils/getCityByFilter";

import { tagFilter } from "@/utils/tagFilter";
import { Button } from "@/shadcn/Button";
import { db } from "@/firebase";
import MyPagination from "@/Components/Pagination/MyPagination";
import { UserProfile } from "@/Components/Card/TypeCard";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();

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
  //   getUserCategories(null, 10, 2, 402).then((res) =>
  //     console.log(res, "filterd")
  //   );
  //   ---------------------------------------------------
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
  //   const filtereItems = useSelector((state: RootState) =>
  //     tagFilter(
  //       getCityByFilter(state.userReducer.items, cityFilter),
  //       categoryFilter
  //     )
  //   );
  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        lastVisible,
      })
    );
  }, [currentPage]);

  if (isLoading) <Spinner />;
  return (
    <div>
      <div>
        <div>
          <MyPagination />
        </div>

        <CardList data={filteredItems} />
        <ModalFilter isShow={modalIsShow} />
      </div>
    </div>
  );
};

export default Catalog;
