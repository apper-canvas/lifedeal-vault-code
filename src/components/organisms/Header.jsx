import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ totalDeals, onAddDeal }) => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gold-500 rounded-xl p-3 shadow-lg">
              <ApperIcon name="Vault" className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gold-200 bg-clip-text text-transparent">
                LifeDeal Vault
              </h1>
              <p className="text-primary-200 mt-1">
                {totalDeals} {totalDeals === 1 ? "deal" : "deals"} in your collection
              </p>
            </div>
          </div>
          
          <Button 
            onClick={onAddDeal}
            variant="secondary"
            className="bg-gold-500 border-gold-500 text-white hover:bg-gold-600 hover:border-gold-600"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Add Deal
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;