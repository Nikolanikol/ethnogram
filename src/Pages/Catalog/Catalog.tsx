import { useEffect } from "react";
import CardList from "../../Components/CardList/CardList";

import Spinner from "../../Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust the path to your store file
import { fetchUsers } from "../../slices/UserSlice/UserSlice";
import ModalFilter from "../../Components/ModalFilter/ModalFilter";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, filteredItems, modalIsShow } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) <Spinner />;
  return (
    <div>
      <div>
        <CardList data={filteredItems} />
        <ModalFilter isShow={modalIsShow} />
      </div>
    </div>
  );
};

export default Catalog;
