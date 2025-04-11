import React, { FC, useEffect } from "react";
import { UserProfile } from "./TypeCard";
import CardImg from "../../UI/CardImg";
import UserLinkPhone from "../../UI/CardUserLinkPhone";
import CardUserTitle from "../../UI/CardUserTitle";
import CardCategories from "../../UI/Categories/CardCategories";
import Service from "../../service";
import CityRow from "../../UI/CityRow/CityRow";
interface CardProps {
  data: UserProfile;
}

// export interface UserProfile {
//   id: string;
//   uid: string;
//   bio: string;
//   phone: string;
//   blockedBy: string[];
//   categories: number[];
//   cities: number[];
//   created: _Timestamp;
//   updated: _Timestamp;
//   image: string[];
//   imagePath: string[];
//   isPublic: boolean;
//   likes: string[];
//   reports: string[];
//   smallImage: string;
//   smallImagePath: string;
// }
const Card: FC<CardProps> = ({ data }) => {
  useEffect(() => {
    Service.getUserCityes();
  }, []);
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300  px-3 py-3">
      <div className="  flex gap-3.5">
        {/* data Image */}
        <CardImg data={data.image} isPublic={data.isPublic} />

        <div>
          {/* data Content */}
          <div className="px-6 py-4">
            <CardUserTitle data={data.bio} />

            <UserLinkPhone data={data.phone} />
          </div>

          {/* Categories and Cities */}
          <div className="px-6 py-2">
            <CityRow data={data.cities} />
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {data.likes?.length}
            </div>
            {/* <div>Created: {formatDate(data.created)}</div> */}
          </div>
        </div>
      </div>
      <CardCategories data={data.categories} />
    </div>
  );
};

export default Card;
