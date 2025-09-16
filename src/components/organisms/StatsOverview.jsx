import React from "react";
import StatCard from "@/components/molecules/StatCard";

const StatsOverview = ({ 
  deals,
  className = "" 
}) => {
  const totalDeals = deals.length;
  const usedDeals = deals.filter(deal => deal.isUsed).length;
  const totalSpent = deals.reduce((sum, deal) => sum + deal.price, 0);
  const usageRate = totalDeals > 0 ? Math.round((usedDeals / totalDeals) * 100) : 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      <StatCard
        title="Total Deals"
        value={totalDeals}
        icon="Package"
      />
      <StatCard
        title="Total Invested"
        value={`$${totalSpent.toLocaleString()}`}
        icon="DollarSign"
      />
      <StatCard
        title="Active Deals"
        value={usedDeals}
        icon="CheckCircle"
      />
      <StatCard
        title="Usage Rate"
        value={`${usageRate}%`}
        icon="TrendingUp"
      />
    </div>
  );
};

export default StatsOverview;