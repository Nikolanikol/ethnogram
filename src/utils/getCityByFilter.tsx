import { UserProfile } from "../slices/UserSlice/UserType";

export const getCityByFilter = (state: UserProfile[], city: string) => {
  if (Number(city) == 0) {
    return state;
  }
  return state.filter((item) => {
    if (Number(city) == 0) {
      return true;
    }
    if (item.cities) {
      return item.cities.includes(Number(city)) || item.cities.includes(0);
    }
  });
};

// export const getData = (
//   state: UserProfile[],
//   city: string,
//   category: string
// ): UserProfile[] => {
//   let res;
//   if (Number(city) == 0) {
//     res = state.filter((item) => {
//       item.categories?.includes(Number(category));
//     });
//   }
//   if (Number(category) == 0) {
//     res = state.filter((item) => {
//       item.cities?.includes(Number(city));
//     });
//   }
//   if (Number(city) != 0 && Number(category) != 0) {
//     res = state.filter((item) => {
//       item.categories?.includes(Number(category)) &&
//         item.cities?.includes(Number(city));
//     });
//   }
//   console.log(res, "res");
//   return state;
// };
