import { UserProfile } from "../slices/UserSlice/UserType";

export const getCityByFilter = (state: UserProfile[], city: string) => {
  return state.filter((item) => {
    if (city == "") {
      return true;
    }
    if (item.cities) {
      return item.cities.includes(Number(city));
    }
  });
};
