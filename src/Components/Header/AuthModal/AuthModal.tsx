import clsx from "clsx";
import { FC, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shadcn/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/shadcn/Button";

import { AppDispatch, RootState } from "@/redux/store";
import { sendOTP, signOut, verifyOTP } from "@/slices/AuthSlice/AuthSlice";

interface AuthModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: FC<AuthModalProps> = ({ modal, setModal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error, confirmationResult } = useSelector(
    (state: RootState) => state.auth
  );
  const [phone, setPhone] = useState("+821077324344");
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    if (!phone) return;
    dispatch(sendOTP(phone));
  };

  const handleVerifyOTP = () => {
    if (!otp || !confirmationResult) return;
    dispatch(verifyOTP({ confirmationResult, otp }));
  };

  const handleSignOut = () => {
    dispatch(signOut());
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
            <div>
              <h2>Авторизация по номеру телефона</h2>
              <div id="recaptcha-container"></div>
              <form action="">
                {user ? (
                  <div>
                    <p>Вы вошли как: {user.phoneNumber}</p>
                    {/* <button onClick={handleSignOut}>Выйти</button> */}
                  </div>
                ) : (
                  <div className="border-2 border-black rounded-md p-4 ">
                    {!confirmationResult ? (
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="+821000000000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="px-4 py-2 rounded-2xl"
                        />
                        <Button
                          variant="default"
                          onClick={handleSendOTP}
                          disabled={loading}
                          type="submit"
                        >
                          {loading ? "Отправка..." : "Отправить код"}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          placeholder="Введите OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="px-4 py-2 rounded-2xl"
                        />
                        <Button
                          variant="default"
                          onClick={handleVerifyOTP}
                          disabled={loading}
                          type="submit"
                        >
                          {loading ? "Проверка..." : "Проверить OTP"}
                        </Button>
                      </div>
                    )}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </div>
                )}
              </form>
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
