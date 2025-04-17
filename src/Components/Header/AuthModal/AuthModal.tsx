import clsx from "clsx";
import { FC, useState } from "react";
import { auth } from "../../../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../shadcn/Dialog";

import {
  googleSignIn,
  logoutUser,
  setUser,
} from "@/slices/AuthSlice/AuthSlice";

import { useDispatch } from "react-redux";
import { Button } from "@/shadcn/Button";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";

interface AuthModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Social {
  id: number;
  name: string;
  sign: () => PayloadAction<User | null>;
}
const AuthModal: FC<AuthModalProps> = ({ modal, setModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // ('login' или 'register')

  // Преобразование номера телефона в псевдо-email
  const pseudoEmail = `${phone}`;

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(phone, password);
    e.preventDefault();
    if (!phone || !password) {
      console.log("Пожалуйста, введите номер телефона и пароль");
      return;
    }
    try {
      if (mode === "register") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          pseudoEmail,
          password
        );
        console.log("Пользователь зарегистрирован:", userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          pseudoEmail,
          password
        );
        console.log("Пользователь авторизован:", userCredential.user);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  return (
    <div
      className={clsx(
        modal
          ? `w-[100vw] h-[100vh] flex-col  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 0 z-50 bg-black/50 fixed  flex justify-center items-center`
          : "hidden"
      )}
    >
      <Dialog open={modal} onOpenChange={() => setModal(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
            <form
              onSubmit={handleSubmit}
              action=""
              className="border-2 min-w-[400px] min-h-[200px] flex flex-col justify-center items-center gap-5"
            >
              <input
                type="text"
                placeholder="Имя"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="cursor-pointer">
                {mode === "register" ? "Зарегистрироваться" : "Войти"}{" "}
              </Button>
            </form>
            <button
              onClick={() =>
                setMode(mode === "register" ? "login" : "register")
              }
            >
              Переключить режим
            </button>
            <div className="flex gap-2">
              <Button className="cursor-pointer">FaceBook</Button>
              <Button
                onClick={() => dispatch(googleSignIn())}
                className="cursor-pointer"
              >
                Google
              </Button>
            </div>
          </DialogHeader>

          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="cursor-pointer border-2 "
                type="button"
                variant="secondary"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;
