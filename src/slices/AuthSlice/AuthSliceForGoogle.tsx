import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../firebase/index";

// Интерфейс состояния авторизации
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null | undefined;
}

// Начальное состояние
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Типизированный асинхронный экшен для Google Sign In
export const googleSignIn = createAsyncThunk<
  User, // возвращаемый тип
  void, // тип аргументов
  { rejectValue: string } // доп. опции
>("auth/googleSignIn", async (_, { rejectWithValue }) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error occurred");
  }
});
// <
//   boolean,
//   void,
//   { rejectValue: string }
// >
// Типизированный асинхронный экшен для logout
export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Типизированный редюсер для установки пользователя
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Очистка ошибки
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Google Sign In
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Sign in failed";
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
