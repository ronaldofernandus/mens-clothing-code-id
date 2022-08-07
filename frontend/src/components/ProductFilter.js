import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductFilter = () => {
  const { query } = useParams();

  const [filterSwitch, setFilterSwitch] = useState({
    tops: query === "tops" ? true : false,
    bottoms: query === "bottoms" ? true : false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if ((filterSwitch.bottoms === true && filterSwitch.tops === true) || (filterSwitch.bottoms === false && filterSwitch.tops === false)) {
      navigate(`/user/home`)
    } else {
      if (filterSwitch.bottoms === true) {
        navigate(`/user/home/bottoms`)
      } else if (filterSwitch.tops === true){
        navigate(`/user/home/tops`)
      }
    }
  }, [filterSwitch])

  return (
    <div className="flex flex-wrap space-x-2 p-3 bg-darkColor rounded w-fit">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="sr-only checked:text-blue"
            checked={filterSwitch.tops}
            onChange={(e) => {
              setFilterSwitch({
                ...filterSwitch,
                bottoms: false,
                tops: !e.target.value,
              });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">topss</div>
      </label>

      <label htmlFor="toogleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleB"
            type="checkbox"
            className="sr-only"
            checked={filterSwitch.bottoms}
            onChange={(e) => {
              setFilterSwitch({
                ...filterSwitch,
                tops: false,
                bottoms: !e.target.value,
              });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">bottomss</div>
      </label>
    </div>
  );
};

export default ProductFilter;
