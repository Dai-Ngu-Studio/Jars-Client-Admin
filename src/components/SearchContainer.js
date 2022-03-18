import { useAppContext } from "context/appContext";
import React from "react";

export const SearchContainer = () => {
  const { search, handleChange } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <form className="w-full max-w-lg">
      <div className="pt-2 relative mx-auto text-gray-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          name="search"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};
