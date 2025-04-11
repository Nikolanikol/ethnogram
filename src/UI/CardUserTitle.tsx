import React, { FC } from "react";
import { toUpperCaseFirst } from "../utils/toUpperCase.tsx";
interface CardUserTitleProps {
  data: string;
}
const CardUserTitle: FC<CardUserTitleProps> = ({ data }) => {
  if (!data)
    return (
      <div className="font-bold text-xs text-left md:text-xl mb-2 text-gray-800 max-w-[400px]">
        Инкогнито
      </div>
    );
  return (
    <div className="font-bold text-xs md:text-xl mb-2 text-gray-800 text-left max-w-[600px]">
      {toUpperCaseFirst(data)}
    </div>
  );
};

export default CardUserTitle;
