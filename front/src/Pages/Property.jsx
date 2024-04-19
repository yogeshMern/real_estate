import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Axios from "axios";
import { toast } from "react-hot-toast";

const Property = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      if (location.state && location.state.property) {
        setData(location.state.property);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [location.state]);

  // saveProperty function
  const saveProperty = async (property) => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token || !token["token"]) {
      toast.success("Login required to save this Property");
      // navigate("/sign-up");
    }

    console.log("tokne", token);

    const obj = {
      // userId: token.token,
      propertyId: property,
    };

    try {
      const res = await Axios.post(
        `http://localhost:8000/api/v1/save_property`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log("Authorization header FrontEnd:", `Bearer ${token}`);
      if (res?.data?.data) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log("Save Property Error!", error.message);
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full col-span-4 p-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <img
                src={data?.property_img}
                alt={data?.name}
                className="w-4/5 rounded object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-gray-800">
                  {data?.name}
                </h2>
                <h2 className="text-2xl font-extrabold text-gray-800">
                  ₹{data?.price}
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-between">
                <p className="text-gray-800 text-xl font-bold">Type</p>
                <p className="text-gray-800 text-xl font-bold">
                  {data?.property_type}
                </p>
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Area</h3>
                  <h3 className="text-lg font-bold text-gray-800">
                    {data?.size}
                  </h3>
                </div>
                {data?.sedOption ? null : (
                  <button
                    type="button"
                    className="w-full mt-4 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded"
                    onClick={() => saveProperty(data.id)}
                  >
                    Save This Property
                  </button>
                )}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Location</h3>
                  <h3 className="text-lg font-bold text-gray-800">
                    {data?.location}
                  </h3>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    Agent Contact
                  </h3>
                  <h3 className="text-lg font-bold text-gray-800">
                    {data?.agent_contact}
                  </h3>
                </div>
                <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                  <li className="list-none">{data?.description}</li>
                </ul>
              </div>
              <div className="mt-8 max-w-md">
                <h3 className="text-lg font-bold text-gray-800">Reviews(10)</h3>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">5.0</p>
                    <svg
                      className="w-5 fill-gray-800 ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                      <div className="w-2/3 h-full rounded bg-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">4.0</p>
                    <svg
                      className="w-5 fill-gray-800 ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                      <div className="w-1/3 h-full rounded bg-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">3.0</p>
                    <svg
                      className="w-5 fill-gray-800 ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                      <div className="w-1/6 h-full rounded bg-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">2.0</p>
                    <svg
                      className="w-5 fill-gray-800 ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                      <div className="w-1/12 h-full rounded bg-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">1.0</p>
                    <svg
                      className="w-5 fill-gray-800 ml-1"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded w-full h-2 ml-3">
                      <div className="w-[6%] h-full rounded bg-gray-800"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full mt-8 px-4 py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Read all reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
