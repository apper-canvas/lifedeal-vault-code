import React from "react";
import DealCard from "@/components/molecules/DealCard";
import Empty from "@/components/ui/Empty";

const DealGrid = ({ 
  deals, 
  onToggleUsage, 
  onEditDeal, 
  onDeleteDeal, 
  onAddDeal,
  className = "" 
}) => {
  const handleOpenUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (deals.length === 0) {
    return (
      <Empty
        title="No deals found"
        description="Start building your lifetime deal collection and track your investments"
        actionLabel="Add Your First Deal"
        onAction={onAddDeal}
        icon="Package"
        className={className}
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          deal={deal}
          onToggleUsage={onToggleUsage}
          onEdit={onEditDeal}
          onDelete={onDeleteDeal}
          onOpenUrl={handleOpenUrl}
        />
      ))}
    </div>
  );
};

export default DealGrid;