import React from "react";
import Select from "@/components/atoms/Select";

const StatusFilter = ({ 
  value, 
  onChange,
  className = "" 
}) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      <option value="">All Status</option>
      <option value="used">Used</option>
      <option value="unused">Unused</option>
    </Select>
  );
};

export default StatusFilter;