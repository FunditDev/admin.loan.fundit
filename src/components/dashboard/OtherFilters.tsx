import { FilterTypes } from "@/utils/types";
import React from "react";
import { object } from "yup";
type OtherFiltersType = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedVal: string;
};
const OtherFilters = ({ handleChange, selectedVal }: OtherFiltersType) => {
  return (
    <div className="">
      <select
        name="otherfilters"
        id=""
        className="w-full py-2 px-1 bg-transparent outline-2 outline-green-500 outline rounded-lg  border-r-4 border-r-transparent"
        onChange={handleChange}
        value={selectedVal}
      >
        {Object.values(FilterTypes).map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OtherFilters;
