import React from "react";
type OtherFiltersType = {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedVal: string;
};
const OtherFilters = ({ handleChange,selectedVal }: OtherFiltersType) => {
  return (
    <div className="">
      <select
        name="otherfilters"
        id=""
        className="w-full py-2 px-1 bg-transparent outline-2 outline-green-500 outline rounded-lg  border-r-4 border-r-transparent"
        onChange={handleChange}
        value={selectedVal}
        
      >
        <option value="All">All</option>
        <option value="Running">Running</option>
        <option value="Due This Month">Due This Month</option>
        <option value="Matured">Matured</option>
        <option value="Date Taken">Date taken</option>
      </select>
    </div>
  );
};

export default OtherFilters;
