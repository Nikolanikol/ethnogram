import { UserProfile } from "../slices/UserSlice/UserType";

export const tagFilter = (
  state: UserProfile[],
  categoryFilter: string = ""
) => {
  console.log(state, "tagfilter");
  console.log(categoryFilter, "categoryFilter");
  if (Number(categoryFilter) === 0) return state;

  return state.filter((item) => {
    if (item.categories) {
      return item.categories.filter((obj) => {
        console.log(obj, "obj");
        console.log(
          obj === Number(categoryFilter),
          "obj === Number(categoryFilter)"
        );
        return obj === Number(categoryFilter);
      });
    }
    console.log("no categories");
  });
};

// function hasMatches(numbersArray, objectsArray) {
//     return objectsArray.map(obj =>
//       obj.categories.some(category => numbersArray.includes(category))
//     );
//   }
