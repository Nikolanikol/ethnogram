// authSlice.js

// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/index";

/**
 * Thunk для отправки SMS с кодом подтверждения по номеру телефона.
 * Принимает номер телефона, например "+1234567890".
 */
export const sendSMSCode = createAsyncThunk(
  "auth/sendSMSCode",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      // Создаем объект reCAPTCHA, если его еще нет в window
      if (!window.recaptchaVerifier) {
        console.log("sendSMSCode", phoneNumber);

        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container", // Элемент, куда будет отрендерена reCAPTCHA
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA пройдена");
            },
            "expired-callback": () => {
              console.log("reCAPTCHA истекла");
            },
          },
          auth
        );
        // Обязательно отрендерим reCAPTCHA
        await window.recaptchaVerifier.render();
      }
      // Отправляем SMS с кодом подтверждения
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      // Возвращаем confirmationResult (не сериализуемый объект)
      return confirmationResult;
    } catch (error) {
      console.log("sendSMSCode error", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Thunk для проверки SMS-кода.
 * Принимает объект с { confirmationResult, code }.
 */
export const verifySMSCode = createAsyncThunk(
  "auth/verifySMSCode",
  async ({ confirmationResult, code }, { rejectWithValue }) => {
    try {
      const userCredential = await confirmationResult.confirm(code);
      return userCredential.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Начальное состояние слайса
const initialState = {
  user: null,
  confirmationResult: null, // Храним временно, для проверки кода
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Синхронный экшн для логаута
    logout(state) {
      state.user = null;
      state.confirmationResult = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка sendSMSCode
      .addCase(sendSMSCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendSMSCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.confirmationResult = action.payload;
      })
      .addCase(sendSMSCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Обработка verifySMSCode
      .addCase(verifySMSCode.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifySMSCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.confirmationResult = null;
      })
      .addCase(verifySMSCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
