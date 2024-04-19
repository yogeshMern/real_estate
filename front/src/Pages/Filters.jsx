import React, { useState } from "react";
import Select from "react-select";

const Filters = ({ applyFilters }) => {
  const [location, setLocation] = useState(null);
  const [maxPrice, setmaxPrice] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  // const [name, setName] = useState(null);

  const handleApplyFilters = () => {
    const filters = {
      location: location ? location.value : null,
      maxPrice: maxPrice ? maxPrice.value : null,
      propertyType: propertyType ? propertyType.value : null,
      // name: name ? name.value : null,
    };

    applyFilters(filters);
  };

  return (
    <div className="w-full cursor-pointer mt-10">
      <ul className="w-[80%] flex justify-between items-center m-auto">
        <li>
          <Select
            options={[
              { value: "New Delhi", label: "New Delhi" },
              { value: "Haryana", label: "Haryana" },
              { value: "Punjab", label: "Punjab" },
            ]}
            onChange={setLocation}
            placeholder="Location"
          />
        </li>
        <li>
          <Select
            options={[
              { value: 1000000, label: "Below 10 Lakhs" },
              { value: 2000000, label: "Below 20 Lakhs" },
              { value: 3000000, label: "Below 30 Lakhs" },
              { value: 4000000, label: "Below 40 Lakhs" },
              { value: 5000000, label: "Below 50 Lakhs" },
            ]}
            onChange={setmaxPrice}
            placeholder="Price"
          />
        </li>
        <li>
          <Select
            options={[
              { value: "Flats", label: "Flats" },
              { value: "House", label: "House" },
              { value: "Farm house", label: "Farm house" },
            ]}
            onChange={setPropertyType}
            placeholder="Property Type"
          />
        </li>
        {/* <li>
          <Select
            options={[
              { value: "Luxary Flats", label: "Luxary Flats" },
              { value: "Flats at Zarah", label: "Flats at Zarah" },
              { value: "Fam House", label: "Fam House" },
              { value: "Flat", label: "Flat" },
              { value: "Farm House", label: "Farm House" },
              { value: "Luxary House", label: "Luxary House" },
            ]}
            onChange={setName}
            placeholder="Search property Name"
          />
        </li> */}
        <li>
          <button
            className="border-2 border-solid-black hover:bg-gray-200 rounded-2 px-2 py-1"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Filters;
