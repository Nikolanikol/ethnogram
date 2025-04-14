import { useEffect, useState } from "react";
import CardList from "../../Components/CardList/CardList";

import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path to your store file
import { fetchUsers } from "../../slices/UserSlice/UserSlice";
import ModalFilter from "../../Components/ModalFilter/ModalFilter";

import { getCityByFilter } from "@/utils/getCityByFilter";

import { tagFilter } from "@/utils/tagFilter";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, modalIsShow, categoryFilter, cityFilter } = useSelector(
    (state: RootState) => state.userReducer
  );
  const filtereItems = useSelector((state: RootState) =>
    tagFilter(
      getCityByFilter(state.userReducer.items, cityFilter),
      categoryFilter
    )
  );
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) <Spinner />;
  return (
    <div>
      <div>
        <CardList data={filtereItems} />
        <ModalFilter isShow={modalIsShow} />
      </div>
    </div>
  );
};

export default Catalog;
