import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./UserType";
import Service from "../../service";
import { UserProfile } from "../../Components/Card/TypeCard";

const initialState: UserState = {
  isLoading: true,
  items: [],
  error: null,
  filteredItems: [],
  cityFilter: 0,
  categoryFilter: 0,
  modalIsShow: false,
  lastVisible: null,
  currentPage: 1,
};

export const fetchUsers = createAsyncThunk(
  "userSlice/fetchUsers",
  async ({ page, lastVisible }: { page: number; lastVisible: any }) => {
    try {
      const limit = 10; // Количество элементов на страницу
      const res = await Service.getUsersCards(lastVisible, limit);

      return { data: res.data, lastVisible: res.lastVisible, page };
    } catch (error) {
      console.error("Ошибка при получении данных: slice", error);
      throw error;
    }
  }
);
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCityFilter: (state, action: PayloadAction<number>) => {
      state.cityFilter = Number(action.payload);
    },
    setCategoryFilter: (state, action: PayloadAction<number>) => {
      state.categoryFilter = Number(action.payload);
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalIsShow = action.payload;
    },
    setModalHidden: (state, action: PayloadAction<boolean>) => {
      state.modalIsShow = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload; // Устанавливаем текущую страницу
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = [
          ...state.items,
          ...(action.payload.data as UserProfile[]),
        ];
        // }
        // Если это не первая страница, добавляем элементы

        state.filteredItems = state.items; // Обновляем отфильтрованные элементы
        state.lastVisible = action.payload.lastVisible;
        state.currentPage = action.payload.page; // Обновляем текущую страницу
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
  setPage,
} = userSlice.actions;
