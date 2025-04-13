import clsx from "clsx";
import { FC } from "react";
import { cityWocabular } from "../../UI/CityRow/CityWocabular";
import { useDispatch } from "react-redux";
import {
  setCityFilter,
  setCategoryFilter,
  setModalHidden,
} from "../../slices/UserSlice/UserSlice";
import { wocabular } from "../../UI/Categories/wocabular";
interface ModalFilterProps {
  isShow: boolean;
}
export interface filterValues {
  city: string;
  category: string;
}
const ModalFilter: FC<ModalFilterProps> = ({ isShow }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setModalHidden(false))}
      className={clsx(
        isShow
          ? `w-[100vw] h-[100vh]  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 0 z-50 bg-black/50 fixed  flex justify-center items-center`
          : "hidden"
      )}
    >
      <div className="px-10 py-6 bg-white rounded-3xl shadow-2xl w-[500px] h-[700px]">
        {" "}
        <h3 className="font-bold text-4xl">Фильтр по категориям</h3>
        <form
          action=""
          className="border-2 mt-5 flex flex-col gap-y-5 px-4 py-3"
        >
          <div className="flex flex-col gap-y-4">
            <label htmlFor="city" className="h4 text-2xl">
              Фильтр по городам
            </label>
            <select
              name="city"
              id="city"
              className="border-1 rounded-xl px-3 py-1 cursor-pointer"
              onChange={(e) => dispatch(setCityFilter(e.target.value))}
            >
              {cityWocabular.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.ru}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="city" className="h4 text-2xl">
              Фильтр по тэгу
            </label>
            <select
              name="category"
              id="city"
              className="border-1 rounded-xl px-3 py-1 cursor-pointer"
              onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
            >
              {wocabular.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFilter;
