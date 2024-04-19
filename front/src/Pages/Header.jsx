import { FaSearch, FaBars, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("token"));

  const logout = () => {
    const data = JSON.parse(localStorage.getItem("token"))
      ? "token"
      : undefined;
    navigate("/");
    if (data) {
      localStorage.clear();
      toast.success("Sign Out successfully");
    } else {
      return null;
    }
  };
  let token = localStorage.getItem("token");

  return (
    <>
      <div className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <MdOutlineRealEstateAgent className="text-white" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <Link to="/">Luxury</Link>
            </span>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-[50px]">
            {!token ||
              (!token["token"] && (
                <Link to="/saved_property">
                  <FaRegUserCircle className="text-white" />
                </Link>
              ))}

            {data?.id ? (
              <button
                type="button"
                onClick={logout}
                className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/sign-up">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
              </Link>
            )}
            <button
              data-collapse-toggle="divbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="text-white" />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          ></div>
        </div>
      </div>
    </>
  );
};

export default Header;
