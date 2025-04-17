import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../Router/router";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible } from "../../slices/UserSlice/UserSlice";
import { Button } from "@/shadcn/Button";
import { use, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

import AuthModal from "./AuthModal/AuthModal";
import { AppDispatch, RootState } from "@/redux/store";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    navigate("/");
    dispatch(setModalVisible(true));
  };
  //   useEffect(() => {
  //     // Подписываемся на изменения состояния Firebase
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //       dispatch(setUser(currentUser));
  //       setModal(false);
  //     });

  //     console.log("unsubscribe");
  //     return () => unsubscribe();
  //   }, [dispatch]);
  //   const { user, loading, error } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  //   console.log(user);
  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;
  return (
    <div className=" bg-[#1E1E1E] text-[#FFFFFF] ">
      <div className="px-[4] mx-4">
        <div className="    flex justify-between items-center px-4 ">
          <NavLink to={"/"}>
            {" "}
            <div className="logo flex gap-2 items-center">
              {/* <img src={logo} alt="logo" className="h-full w-[100px]" /> */}
              <span className="text-xl md:text-2xl lg:text-4xl">ETHNO</span>
            </div>
          </NavLink>

          <div className="flex gap-6 py-6 ">
            {links.map((link, i) => {
              return (
                <NavLink
                  key={i}
                  to={link.path}
                  className=" text-xs md:text-2xl lg:text-4xl font-bold hover:text-gray-300 flex items-center"
                >
                  {link.name}
                </NavLink>
              );
            })}
            {/* {user ? (
              <Button
                className="cursor-pointer"
                onClick={() => dispatch(logoutUser())}
              >
                Выйти
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={() => setModal(true)}>
                Войти
              </Button>
            )} */}
          </div>

          <div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg border-1 bg-white text-black  lg:w-[200px] lg:h-[50px] cursor-pointer"
              onClick={() => handleClick()}
            >
              Поиск
            </button>
          </div>
        </div>
      </div>{" "}
      <PhoneAuth modal={modal} setModal={setModal} />
    </div>
  );
};

export default Header;

// PhoneAuth.jsx

import {
  sendSMSCode,
  verifySMSCode,
  logout,
} from "../../slices/AuthSlice/AuthSlice";

const PhoneAuth = () => {
  const dispatch = useDispatch();
  const { user, confirmationResult, status, error } = useSelector(
    (state: RootState) => state.auth
  );
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  // Отправка SMS с кодом подтверждения
  const handleSendSMS = (e) => {
    e.preventDefault();
    console.log(phone);
    dispatch(sendSMSCode(phone));
  };

  // Проверка введенного кода
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (confirmationResult) {
      dispatch(verifySMSCode({ confirmationResult, code }));
    }
  };

  return (
    <div>
      <h2>Аутентификация по номеру телефона</h2>
      {!confirmationResult && !user ? (
        <form onSubmit={handleSendSMS} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Номер телефона (например, +1234567890)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg p-2"
          />
          <button className="bg-amber-400 border-2" type="submit">
            Отправить SMS
          </button>
        </form>
      ) : !user ? (
        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Код из SMS"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="bg-amber-400 border-2" type="submit">
            Подтвердить код
          </button>
        </form>
      ) : (
        <div>
          <p>Пользователь авторизован: {user.phoneNumber || user.email}</p>
          <button onClick={() => dispatch(logout())}>Выйти</button>
        </div>
      )}
      {status === "loading" && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Контейнер для reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};
