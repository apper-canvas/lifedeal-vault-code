import { toast } from "react-toastify";

class DealService {
  constructor() {
    this.tableName = "deal_c";
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "purchase_date_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "url_c" } },
          { field: { Name: "is_used_c" } },
          { field: { Name: "last_accessed_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [{ fieldName: "created_at_c", sorttype: "DESC" }],
        pagingInfo: { limit: 100, offset: 0 }
      };
      
      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(deal => ({
        Id: deal.Id,
        id: deal.Id.toString(),
        name: deal.name_c || deal.Name || "",
        price: deal.price_c || 0,
        purchaseDate: deal.purchase_date_c || new Date().toISOString(),
        category: deal.category_c?.Name || "",
        description: deal.description_c || "",
        url: deal.url_c || "",
        isUsed: deal.is_used_c || false,
        lastAccessed: deal.last_accessed_c || null,
        notes: deal.notes_c || "",
        createdAt: deal.created_at_c || new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error);
      toast.error("Failed to load deals. Please try again.");
      return [];
    }
  }

  async getById(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "price_c" } },
          { field: { Name: "purchase_date_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "url_c" } },
          { field: { Name: "is_used_c" } },
          { field: { Name: "last_accessed_c" } },
          { field: { Name: "notes_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response?.data) {
        toast.error("Deal not found");
        return null;
      }
      
      const deal = response.data;
      return {
        Id: deal.Id,
        id: deal.Id.toString(),
        name: deal.name_c || deal.Name || "",
        price: deal.price_c || 0,
        purchaseDate: deal.purchase_date_c || new Date().toISOString(),
        category: deal.category_c?.Name || "",
        description: deal.description_c || "",
        url: deal.url_c || "",
        isUsed: deal.is_used_c || false,
        lastAccessed: deal.last_accessed_c || null,
        notes: deal.notes_c || "",
        createdAt: deal.created_at_c || new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load deal. Please try again.");
      return null;
    }
  }

  async create(dealData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: dealData.name || dealData.Name,
          name_c: dealData.name || dealData.Name,
          price_c: parseFloat(dealData.price) || 0,
          purchase_date_c: dealData.purchaseDate || new Date().toISOString().split('T')[0],
          category_c: parseInt(dealData.categoryId) || null,
          description_c: dealData.description || "",
          url_c: dealData.url || "",
          is_used_c: false,
          notes_c: dealData.notes || "",
          created_at_c: new Date().toISOString(),
          Tags: dealData.tags || ""
        }]
      };
      
      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const newDeal = successful[0].data;
          return {
            Id: newDeal.Id,
            id: newDeal.Id.toString(),
            name: newDeal.name_c || newDeal.Name || "",
            price: newDeal.price_c || 0,
            purchaseDate: newDeal.purchase_date_c || new Date().toISOString(),
            category: newDeal.category_c?.Name || "",
            description: newDeal.description_c || "",
            url: newDeal.url_c || "",
            isUsed: false,
            lastAccessed: null,
            notes: newDeal.notes_c || "",
            createdAt: newDeal.created_at_c || new Date().toISOString()
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error);
      toast.error("Failed to create deal. Please try again.");
      return null;
    }
  }

  async update(id, dealData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const updateData = {
        Id: parseInt(id)
      };
      
      if (dealData.name !== undefined) updateData.name_c = dealData.name;
      if (dealData.Name !== undefined) updateData.Name = dealData.Name;
      if (dealData.price !== undefined) updateData.price_c = parseFloat(dealData.price);
      if (dealData.purchaseDate !== undefined) updateData.purchase_date_c = dealData.purchaseDate;
      if (dealData.categoryId !== undefined) updateData.category_c = parseInt(dealData.categoryId);
      if (dealData.description !== undefined) updateData.description_c = dealData.description;
      if (dealData.url !== undefined) updateData.url_c = dealData.url;
      if (dealData.isUsed !== undefined) updateData.is_used_c = dealData.isUsed;
      if (dealData.lastAccessed !== undefined) updateData.last_accessed_c = dealData.lastAccessed;
      if (dealData.notes !== undefined) updateData.notes_c = dealData.notes;
      if (dealData.tags !== undefined) updateData.Tags = dealData.tags;
      
      const params = {
        records: [updateData]
      };
      
      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updatedDeal = successful[0].data;
          return {
            Id: updatedDeal.Id,
            id: updatedDeal.Id.toString(),
            name: updatedDeal.name_c || updatedDeal.Name || "",
            price: updatedDeal.price_c || 0,
            purchaseDate: updatedDeal.purchase_date_c || new Date().toISOString(),
            category: updatedDeal.category_c?.Name || "",
            description: updatedDeal.description_c || "",
            url: updatedDeal.url_c || "",
            isUsed: updatedDeal.is_used_c || false,
            lastAccessed: updatedDeal.last_accessed_c || null,
            notes: updatedDeal.notes_c || "",
            createdAt: updatedDeal.created_at_c || new Date().toISOString()
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error);
      toast.error("Failed to update deal. Please try again.");
      return null;
    }
  }

  async delete(id) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} deals:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error);
      toast.error("Failed to delete deal. Please try again.");
      return false;
    }
  }
}

const dealService = new DealService();
export default dealService;