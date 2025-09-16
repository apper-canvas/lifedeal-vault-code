import React from "react";
import Select from "@/components/atoms/Select";

const CategoryFilter = ({ 
  value, 
  onChange, 
  categories = [],
  className = "" 
}) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name} ({category.dealCount})
        </option>
      ))}
    </Select>
  );
};

export default CategoryFilter;