import { FC } from "react";
import { cityWocabular } from "./CityWocabular";
interface CityRowProps {
  data: number[];
}
interface CityData {
  id: number;
  ru: string;
}
const CityRow: FC<CityRowProps> = ({ data }) => {
  let cityes: CityData[] = [{ id: 0, ru: "Город не указан" }];
  if (data && data.length > 0) {
    cityes = cityWocabular.filter((item) => {
      return data.includes(item.id);
    });
  }

  return (
    <div className="flex gap-x-2 w-full h-20">
      {cityes.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-green-600 duration-700 text-xs self-center hover:-top-1 hover:bg-green-400 relative top-0  px-3 font-bold cursor-pointer md:text-2xl py-1 rounded-2xl inline-block"
          >
            {item.ru}
          </div>
        );
      })}
    </div>
  );
};

export default CityRow;
