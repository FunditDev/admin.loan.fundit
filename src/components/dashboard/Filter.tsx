import React from "react";

type props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};
const Filter = ({ setSearch, search }: props) => {
  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Search by staff id or amount taken or date taken" 
        className="border border-gray-300 ring-0 rounded-md p-2 w-full"
        value={search}
        
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Filter;
