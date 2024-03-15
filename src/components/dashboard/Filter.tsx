import React from "react";

type props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  placeholder?: string;
};
const Filter = ({ setSearch, search,placeholder }: props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 ring-0 rounded-md p-2 w-full"
        value={search}
        
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Filter;
