// import { useEffect, useState } from "react";
// import Item from "../Components/Item";
// import Axios from "axios";
// import Loader from "./Loader";
// import Banner from "../Components/Banner";
// import Filter from "./Filters";

// const Propertylist = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (filters) => {
//     setLoading(true);
//     try {
//       const res = await Axios.get(
//         "http://localhost:8000/api/v1/property_list",
//         {
//           params: filters,
//         }
//       );
//       setData(res.data.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//     setLoading(false);
//   };

//   const applyFilters = (filters) => {
//     fetchData(filters);
//   };

//   return (
//     <>
//       <Banner
//         description="Find the Luxury Here..."
//         text="India's only real estate"
//         image="./public/background.jpg"
//         view="View Now"
//       />

//       <div className="flex flex-col items-center gap-[10px] min-h-screen">
//         <h1 className="text-[#171717] text-[40px] font-semibold mt-[30px]">
//           Find Better Places to Live
//         </h1>
//         <hr className="w-[200px] h-[6px] border rounded-[6px] bg-[#252525]" />

//         <Filter applyFilters={applyFilters} />
//         <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[50px]">
//           {loading ? (
//             <div className="flex justify-center items-center w-full col-span-4">
//               <Loader />
//             </div>
//           ) : (
//             data.map((ele, ind) => {
//               return (
//                 <Item
//                   key={ind}
//                   id={ele?._id}
//                   name={ele?.name}
//                   property_img={ele?.property_img}
//                   price={ele?.price}
//                   agent_contact={ele?.agent_contact_number}
//                   property_type={ele?.property_type}
//                   description={ele?.description}
//                   size={ele?.property_diameter}
//                   location={ele?.location}
//                 />
//               );
//             })
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Propertylist;

import React, { useEffect, useState } from "react";
import Item from "../Components/Item";
import Axios from "axios";
import Loader from "./Loader";
import Banner from "../Components/Banner";
import Filter from "./Filters";
import debounce from "lodash.debounce";

const Propertylist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters) => {
    setLoading(true);
    try {
      const res = await Axios.get(
        "http://localhost:8000/api/v1/property_list",
        {
          params: { ...filters, name: searchQuery },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Debounce the fetchData function
  const debouncedFetchData = debounce(fetchData, 300);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    // Call debouncedFetchData instead of fetchData directly
    debouncedFetchData();
  };

  const applyFilters = (filters) => {
    fetchData(filters);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-[10px] min-h-screen">
        <h1 className="text-[#171717] text-[40px] font-semibold mt-[30px]">
          Find Better Places to Live
        </h1>
        <hr className="w-[200px] h-[6px] border rounded-[6px] bg-[#252525]" />

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mt-4 p-2 border border-gray-300 rounded-md"
        />

        <Filter applyFilters={applyFilters} />
        <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[50px]">
          {loading ? (
            <div className="flex justify-center items-center w-full col-span-4">
              <Loader />
            </div>
          ) : (
            data.map((ele, ind) => {
              return (
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
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Propertylist;
