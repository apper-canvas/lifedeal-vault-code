import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import StatsOverview from "@/components/organisms/StatsOverview";
import FilterControls from "@/components/organisms/FilterControls";
import DealGrid from "@/components/organisms/DealGrid";
import DealModal from "@/components/organisms/DealModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import dealService from "@/services/api/dealService";
import categoryService from "@/services/api/categoryService";

const Dashboard = () => {
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [dealsData, categoriesData] = await Promise.all([
        dealService.getAll(),
        categoryService.getAll()
      ]);
      
      setDeals(dealsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load deals. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = searchTerm === "" || 
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = selectedCategory === "" || deal.category === selectedCategory;
      
      const matchesStatus = selectedStatus === "" || 
        (selectedStatus === "used" && deal.isUsed) ||
        (selectedStatus === "unused" && !deal.isUsed);
        
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [deals, searchTerm, selectedCategory, selectedStatus]);

  const handleAddDeal = () => {
    setEditingDeal(null);
    setIsModalOpen(true);
  };

  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleSaveDeal = async (dealData) => {
    try {
      if (editingDeal) {
        const updatedDeal = await dealService.update(editingDeal.id, dealData);
        setDeals(prev => prev.map(d => d.id === editingDeal.id ? updatedDeal : d));
        toast.success("Deal updated successfully!");
      } else {
        const newDeal = await dealService.create(dealData);
        setDeals(prev => [...prev, newDeal]);
        toast.success("Deal added successfully!");
      }
      
      setIsModalOpen(false);
      setEditingDeal(null);
    } catch (err) {
      toast.error("Failed to save deal. Please try again.");
      console.error("Error saving deal:", err);
    }
  };

  const handleDeleteDeal = async (dealId) => {
    if (!window.confirm("Are you sure you want to delete this deal?")) return;
    
    try {
      await dealService.delete(dealId);
      setDeals(prev => prev.filter(d => d.id !== dealId));
      toast.success("Deal deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete deal. Please try again.");
      console.error("Error deleting deal:", err);
    }
  };

  const handleToggleUsage = async (dealId) => {
    try {
      const deal = deals.find(d => d.id === dealId);
      if (!deal) return;
      
      const updatedDeal = await dealService.update(dealId, {
        ...deal,
        isUsed: !deal.isUsed,
        lastAccessed: !deal.isUsed ? new Date().toISOString() : deal.lastAccessed
      });
      
      setDeals(prev => prev.map(d => d.id === dealId ? updatedDeal : d));
      toast.success(`Deal marked as ${!deal.isUsed ? "used" : "unused"}!`);
    } catch (err) {
      toast.error("Failed to update deal status. Please try again.");
      console.error("Error updating deal:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header totalDeals={0} onAddDeal={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Header totalDeals={0} onAddDeal={() => {}} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadData} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <Header totalDeals={deals.length} onAddDeal={handleAddDeal} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <StatsOverview deals={deals} />
        
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          categories={categories}
        />
        
        <DealGrid
          deals={filteredDeals}
          onToggleUsage={handleToggleUsage}
          onEditDeal={handleEditDeal}
          onDeleteDeal={handleDeleteDeal}
          onAddDeal={handleAddDeal}
        />
      </main>
      
      <DealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDeal(null);
        }}
        onSave={handleSaveDeal}
        deal={editingDeal}
        categories={categories}
      />
    </div>
  );
};

export default Dashboard;