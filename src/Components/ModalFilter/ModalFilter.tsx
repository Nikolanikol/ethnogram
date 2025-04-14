import clsx from "clsx";
import { FC } from "react";
import { cityWocabular } from "../../UI/CityRow/CityWocabular";
import { useDispatch, useSelector } from "react-redux";
import {
  setCityFilter,
  setCategoryFilter,
  setModalHidden,
} from "../../slices/UserSlice/UserSlice";
import { wocabular } from "../../UI/Categories/wocabular";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../shadcn/Dialog";
import { Button } from "@/shadcn/Button";

import { RootState } from "@/redux/store";

interface ModalFilterProps {
  isShow: boolean;
}
export interface filterValues {
  city: string;
  category: string;
}
const ModalFilter: FC<ModalFilterProps> = ({ isShow }) => {
  const { categoryFilter, cityFilter } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useDispatch();
  return (
    <div
      className={clsx(
        isShow
          ? `w-[100vw] h-[100vh] flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 0 z-50 bg-black/50 fixed  flex justify-center items-center`
          : "hidden"
      )}
    >
      <Dialog
        open={isShow}
        onOpenChange={() => dispatch(setModalHidden(false))}
      >
        {/* <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Фильтр</DialogTitle>
            <DialogDescription>Выберите город и категорию</DialogDescription>
          </DialogHeader>

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
                value={cityFilter}
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
                value={categoryFilter}
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

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="cursor-pointer border-2 "
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalFilter;
