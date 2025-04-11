import React, { FC, useEffect, useState } from "react";
import Service from "../../service";
import { wocabular } from "./wocabular";
interface CardCategoriesProps {
  data: number[];
}
const CardCategories: FC<CardCategoriesProps> = ({ data }) => {
  let categories = [{ id: 0, title: "Не указано" }];
  if (data && data.length > 0) {
    categories = wocabular.filter((item) => {
      return data.includes(item.id);
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-nowrap gap-x-2 items-center h-10">
        {categories.map((item) => {
          return (
            <div
              key={item.id}
              className="flex-shrink-0 text-center text-sm md:text-base w-auto px-3 py-1 rounded-2xl bg-gray-400 hover:bg-gray-500 cursor-pointer hover:text-white transition-all duration-300 block"
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCategories;
