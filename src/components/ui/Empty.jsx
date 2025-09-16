import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No deals found", 
  description = "Start building your lifetime deal collection", 
  actionLabel = "Add Your First Deal",
  onAction,
  icon = "Package",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-full p-8 mb-6">
        <ApperIcon 
          name={icon} 
          className="w-16 h-16 text-gold-500" 
        />
      </div>
      
      <h3 className="text-2xl font-bold text-primary-800 mb-3 text-center">
        {title}
      </h3>
      
      <p className="text-surface-600 text-center mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;