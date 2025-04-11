import React, { FC } from "react";
import noUserCard from "../assets/noUserCard.jpg";
interface CardImgProps {
  data: string[];
  isPublic: boolean;
}
const CardImg: FC<CardImgProps> = ({ data, isPublic }) => {
  return (
    <div className="relative overflow-hidden flex items-center lg:bg-gray-100 shrink-0">
      <div className="md:w-[170px] w-[100px] flex items-center justify-center shrink-0  shadow-2xl md:shadow-gray-500 rounded-3xl overflow-hidden">
        {data && data.length > 0 ? (
          <img
            src={data[0]}
            alt="User image"
            className="object-center w-full h-full"
          />
        ) : (
          <img
            src={noUserCard}
            alt="User image"
            className="object-center w-full h-full"
          />
        )}
      </div>

      {!isPublic && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Private
        </div>
      )}
    </div>
  );
};

export default CardImg;
