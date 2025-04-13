import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./UserType";
import Service from "../../service";
import { UserProfile } from "../../Components/Card/TypeCard";
import { tagFilter } from "../../utils/tagFilter";
import { cityFilter } from "../../utils/CityFilter";

const initialState: UserState = {
  isLoading: true,
  items: [],
  error: null,
  filteredItems: [],
  cityFilter: "",
  categoryFilter: "",
  modalIsShow: false,
};

export const fetchUsers = createAsyncThunk("userSlice/fetchUsers", async () => {
  try {
    const res = await Service.getUsersCards();
    return res;
  } catch (error) {
    throw error;
  }
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCityFilter: (state, action: PayloadAction<string>) => {
      state.cityFilter = action.payload;
      state.filteredItems = [
        ...tagFilter(cityFilter(state.items, state.cityFilter)),
      ];
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
      state.filteredItems = [
        ...tagFilter(
          cityFilter(state.items, state.cityFilter),
          state.categoryFilter
        ),
      ];
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalIsShow = action.payload;
    },
    setModalHidden: (state, action: PayloadAction<boolean>) => {
      state.modalIsShow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload as UserProfile[];
        state.filteredItems = action.payload as UserProfile[];
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка при загрузке данных";
      });
  },
});
export default userSlice.reducer;
export const {
  setCityFilter,
  setCategoryFilter,
  setModalVisible,
  setModalHidden,
} = userSlice.actions;
