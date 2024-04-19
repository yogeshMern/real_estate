import { useEffect, useState } from "react";
import Item from "../Components/Item";
import Axios from "axios";
import Loader from "./Loader";
import Contact from "./Contact";
import Banner from "../Components/Banner";

const Savedproperty = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperty();
  }, []);

  const fetchSavedProperty = async () => {
    setLoading(true);
    await Axios.get(`http://localhost:8000/api/v1/get_all_saved_properties`)
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => console.log("Error Saved Property Fetching", err));
  };

  return (
    <>
      <Banner
        description="Find the Luxury Here..."
        text="India's only real estate"
        image="./public/background.jpg"
        view="View Now"
      />

      {data.length ? (
        <div className="flex flex-col items-center gap-[10px] min-h-screen">
          <h1 className="text-[#171717] text-[40px] font-semibold mt-[30px]">
            Saved Properties
          </h1>
          <hr className="w-[200px] h-[6px] border rounded-[6px] bg-[#252525]" />
          <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[50px]">
            {loading ? (
              <div className="flex justify-center items-center w-full col-span-4">
                <Loader />
              </div>
            ) : (
              data[0]?.property?.map((ele, ind) => (
                <Item
                  key={ind}
                  id={ele?._id}
                  name={ele?.name}
                  property_img={ele?.property_img}
                  price={ele?.price}
                  agent_contact={ele?.agent_contact_number}
                  property_type={ele?.property_type}
                  description={ele?.description}
                  size={ele?.property_diameter}
                  location={ele?.location}
                  sedOption={"disableButton"}
                />
              ))
            )}
          </div>
        </div>
      ) : null}

      <Contact />
    </>
  );
};

export default Savedproperty;
