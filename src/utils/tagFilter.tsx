import { UserProfile } from "../slices/UserSlice/UserType";

export const tagFilter = (
  state: UserProfile[],
  categoryFilter: string = ""
) => {
  if (Number(categoryFilter) === 0) return state;
  console.log(categoryFilter, "categories");
  console.log(state, "state");

  return state.filter((item) => {
    if (item.categories) {
      return item.categories.includes(Number(categoryFilter));
    }
  });
};

// function hasMatches(numbersArray, objectsArray) {
//     return objectsArray.map(obj =>
//       obj.categories.some(category => numbersArray.includes(category))
//     );
//   }
