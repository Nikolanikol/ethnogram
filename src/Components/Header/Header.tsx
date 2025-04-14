import { NavLink, useNavigate } from "react-router-dom";
import { links } from "../../Router/router";
import { useDispatch } from "react-redux";
import { setModalVisible } from "../../slices/UserSlice/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    dispatch(setModalVisible(true));
  };
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
                  className=" text-xs md:text-2xl lg:text-4xl font-bold hover:text-gray-300"
                >
                  {link.name}
                </NavLink>
              );
            })}
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
      </div>
    </div>
  );
};

export default Header;
