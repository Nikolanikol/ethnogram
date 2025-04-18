import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SendOTPResponse {
  confirmationResult: firebase.auth.ConfirmationResult;
}
import firebase from "../../firebase/index";
declare global {
  interface Window {
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  }
}
/**
 * Thunk для отправки SMS с кодом подтверждения по номеру телефона.
 * Принимает номер телефона, например "+1234567890".
 */

// src/store/authSlice.js

// Асинхронное действие для отправки OTP
export const sendOTP = createAsyncThunk<
  SendOTPResponse,
  string,
  { rejectValue: string }
>("auth/sendOTP", async (phoneNumber, { rejectWithValue }) => {
  try {
    // Инициализация reCAPTCHA
    if (!window.recaptchaVerifier) {
      // Очистка предыдущего экземпляра
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", // ID контейнера
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA успешно выполнена:", response);
          },
        }
      );
    }
    console.log("Инициализация reCAPTCHA");

    // Отправка OTP на номер телефона
    console.log("Отправка OTP на номер телефона");
    const auth = firebase.auth();
    const confirmationResult = await auth.signInWithPhoneNumber(
      phoneNumber,
      window.recaptchaVerifier
    );
    console.log("confirmationResult:", confirmationResult);

    return { confirmationResult };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
interface VerifyOTPArgs {
  confirmationResult: firebase.auth.ConfirmationResult;
  otp: string;
}
// Асинхронное действие для проверки OTP
export const verifyOTP = createAsyncThunk<
  firebase.User | null, // Тип возвращаемого значения
  VerifyOTPArgs, // Тип аргументов
  { rejectValue: string } // Тип значения при ошибке
>(
  "auth/verifyOTP",
  async ({ confirmationResult, otp }, { rejectWithValue }) => {
    try {
      const result = await confirmationResult.confirm(otp);
      return result.user; // Зарегистрированный пользователь
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  user: firebase.User | null;
  loading: boolean;
  error: string | null;
  confirmationResult: firebase.auth.ConfirmationResult | null;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  confirmationResult: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.confirmationResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        sendOTP.fulfilled,
        (
          state,
          action: PayloadAction<{
            confirmationResult: firebase.auth.ConfirmationResult;
          }>
        ) => {
          state.loading = false;
          state.confirmationResult = action.payload.confirmationResult;
        }
      )
      .addCase(
        sendOTP.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Ошибка при отправке OTP";
        }
      )
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        verifyOTP.fulfilled,
        (state, action: PayloadAction<firebase.User | null>) => {
          state.loading = false;
          state.user = action.payload;
          state.confirmationResult = null;
        }
      )
      .addCase(
        verifyOTP.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Ошибка при проверке OTP";
        }
      );
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
