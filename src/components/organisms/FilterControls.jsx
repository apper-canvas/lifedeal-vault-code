import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import StatusFilter from "@/components/molecules/StatusFilter";

const FilterControls = ({ 
  searchTerm, 
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories,
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-card ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search deals by name or description..."
          />
        </div>
        <div className="w-full lg:w-48">
          <CategoryFilter
            value={selectedCategory}
            onChange={onCategoryChange}
            categories={categories}
          />
        </div>
        <div className="w-full lg:w-32">
          <StatusFilter
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;