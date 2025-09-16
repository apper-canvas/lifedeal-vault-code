import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Switch from "@/components/atoms/Switch";

const DealCard = ({ 
  deal, 
  onToggleUsage, 
  onEdit, 
  onDelete, 
  onOpenUrl,
  className = "" 
}) => {
  const getCategoryColor = (category) => {
    const colors = {
      "Productivity": "bg-blue-100 text-blue-800",
      "Design": "bg-purple-100 text-purple-800",
      "Marketing": "bg-green-100 text-green-800",
      "Development": "bg-indigo-100 text-indigo-800",
      "Business": "bg-yellow-100 text-yellow-800",
      "Analytics": "bg-pink-100 text-pink-800",
      "Communication": "bg-teal-100 text-teal-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors["Other"];
  };

  return (
<div className={`card p-6 ${className}`} key={deal.Id}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-surface-900 mb-2">
            {deal.name}
          </h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-500 bg-clip-text text-transparent">
            ${deal.price}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {deal.url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenUrl(deal.url)}
              className="p-2"
            >
              <ApperIcon name="ExternalLink" className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(deal)}
            className="p-2"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
onClick={() => onDelete(deal.Id)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-surface-600 text-sm mb-4 line-clamp-3">
        {deal.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <Badge className={getCategoryColor(deal.category)}>
          {deal.category}
        </Badge>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-surface-600">
            {deal.isUsed ? "In Use" : "Unused"}
          </span>
          <Switch
checked={deal.isUsed}
            onCheckedChange={() => onToggleUsage(deal.Id)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-surface-500">
        <span>
          Purchased {format(new Date(deal.purchaseDate), "MMM dd, yyyy")}
        </span>
        {deal.lastAccessed && (
          <span>
            Last used {format(new Date(deal.lastAccessed), "MMM dd")}
          </span>
        )}
      </div>
    </div>
  );
};

export default DealCard;