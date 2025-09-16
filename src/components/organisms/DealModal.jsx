import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Label from "@/components/atoms/Label";
import { format } from "date-fns";
import { toast } from "react-toastify";

const DealModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  deal = null,
  categories = [] 
}) => {
const [formData, setFormData] = useState({
    name: "",
    price: "",
    purchaseDate: format(new Date(), "yyyy-MM-dd"),
    category: "",
    description: "",
    url: "",
    notes: ""
  });
  
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name || "",
        price: deal.price?.toString() || "",
purchaseDate: deal.purchaseDate ? format(new Date(deal.purchaseDate), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
        category: deal.category || "",
        description: deal.description || "",
        url: deal.url || "",
        notes: deal.notes || ""
      });
    } else {
      setFormData({
        name: "",
        price: "",
        purchaseDate: format(new Date(), "yyyy-MM-dd"),
        category: "",
        description: "",
        url: "",
        notes: ""
      });
    }
    setErrors({});
  }, [deal, isOpen]);

const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const generateDescription = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a deal name first");
      return;
    }

    setIsGeneratingDescription(true);
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const result = await apperClient.functions.invoke('VITE_GENERATE_DESCRIPTION', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dealName: formData.name.trim()
        })
      });

      if (result.success) {
        handleChange('description', result.description);
        toast.success("Description generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate description");
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast.error("Failed to generate description. Please try again.");
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Deal name is required";
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

const dealData = {
      ...formData,
      price: parseFloat(formData.price),
      purchaseDate: formData.purchaseDate
    };

    onSave(dealData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-800">
              {deal ? "Edit Deal" : "Add New Deal"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Deal Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter deal name"
                className={errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="0.00"
                className={errors.price ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={errors.category ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""}
              >
                <option value="">Select a category</option>
{categories.map((category) => (
                  <option key={category.Id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <Label htmlFor="purchaseDate">Purchase Date *</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleChange("purchaseDate", e.target.value)}
                className={errors.purchaseDate ? "border-red-300 focus:border-red-400 focus:ring-red-400" : ""}
              />
              {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
            </div>

            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div>
<div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription || !formData.name.trim()}
                  className="text-gold-600 hover:text-gold-700 text-sm flex items-center gap-1"
                >
                  {isGeneratingDescription ? (
                    <>
                      <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Sparkles" className="w-3 h-3" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="What does this deal offer? (or click Generate to create automatically)"
                rows={3}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors duration-200 bg-white placeholder:text-surface-400 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Any additional notes or thoughts"
                rows={2}
                className="w-full px-4 py-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors duration-200 bg-white placeholder:text-surface-400 resize-none"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                {deal ? "Update Deal" : "Save Deal"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DealModal;