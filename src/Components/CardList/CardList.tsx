import { FC } from "react";
import { UserProfile } from "../Card/TypeCard";
import Card from "../Card/Card";

interface CardListProps {
  data: UserProfile[];
}
const CardList: FC<CardListProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-4">
      {data.map((card) => {
        return <Card data={card} key={card.id} />;
      })}
    </div>
  );
};

export default CardList;
