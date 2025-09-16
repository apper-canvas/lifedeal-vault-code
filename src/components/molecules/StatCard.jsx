import React from "react";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-card hover:shadow-premium transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-br from-gold-100 to-gold-200 rounded-lg p-3">
          <ApperIcon name={icon} className="w-6 h-6 text-gold-600" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
          {value}
        </h3>
        <p className="text-surface-600 text-sm font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatCard;