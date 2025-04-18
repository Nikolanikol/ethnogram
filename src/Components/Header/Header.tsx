import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../Router/router";
import { useDispatch, useSelector } from "react-redux";
import { setModalVisible } from "../../slices/UserSlice/UserSlice";
import { useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import AuthModal from "./AuthModal/AuthModal";
import { signOut } from "@/slices/AuthSlice/AuthSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, loading, error, confirmationResult } = useSelector(
    (state: RootState) => state.auth
  );
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    navigate("/");
    dispatch(setModalVisible(true));
  };
  console.log(confirmationResult, "confirmationResult");
  return (
    <div className=" bg-[#1E1E1E] text-[#FFFFFF] ">
      <div id="recaptcha-container"></div>
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
          </div>

          <div className="flex gap-2">
            {!(user && user.uid) ? (
              <button
                type="button"
                className="px-4 py-2 rounded-lg border-1 bg-white text-black  lg:w-[200px] lg:h-[50px] cursor-pointer"
                onClick={() => setModal(true)}
              >
                Войти
              </button>
            ) : (
              <button
                type="button"
                className="px-4 py-2 rounded-lg border-1 bg-white text-black  lg:w-[200px] lg:h-[50px] cursor-pointer"
                onClick={() => dispatch(signOut())}
              >
                Выйти
              </button>
            )}

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
      <AuthModal modal={modal} setModal={setModal} />
    </div>
  );
};

export default Header;

// PhoneAuth.jsx

// import { signOut, verifyOTP, sendOTP } from "../../slices/AuthSlice/AuthSlice";

// const PhoneAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, loading, error, confirmationResult } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");

//   const handleSendOTP = () => {
//     if (!phone) return;
//     dispatch(sendOTP(phone));
//   };

//   const handleVerifyOTP = () => {
//     if (!otp || !confirmationResult) return;
//     dispatch(verifyOTP({ confirmationResult, otp }));
//   };

//   const handleSignOut = () => {
//     dispatch(signOut());
//   };

//   return (
//     <div>
//       <h2>Авторизация по номеру телефона</h2>
//       <div id="recaptcha-container"></div>

//       {user ? (
//         <div>
//           <p>Вы вошли как: {user.phoneNumber}</p>
//           <button onClick={handleSignOut}>Выйти</button>
//         </div>
//       ) : (
//         <div>
//           {!confirmationResult ? (
//             <div>
//               <input
//                 type="text"
//                 placeholder="+71234567890"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//               <button onClick={handleSendOTP} disabled={loading}>
//                 {loading ? "Отправка..." : "Отправить код"}
//               </button>
//             </div>
//           ) : (
//             <div>
//               <input
//                 type="text"
//                 placeholder="Введите OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button onClick={handleVerifyOTP} disabled={loading}>
//                 {loading ? "Проверка..." : "Проверить OTP"}
//               </button>
//             </div>
//           )}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//       )}
//     </div>
//   );
// };
