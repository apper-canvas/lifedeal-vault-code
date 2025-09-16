import { toast } from "react-toastify";

class CategoryService {
  constructor() {
    this.tableName = "category_c";
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
          { field: { Name: "color_c" } },
          { field: { Name: "deal_count_c" } },
          { field: { Name: "Tags" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }],
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
      
      return response.data.map(category => ({
        Id: category.Id,
        id: category.Id.toString(),
        name: category.name_c || category.Name || "",
        color: category.color_c || "#2196f3",
        dealCount: category.deal_count_c || 0
      }));
    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      toast.error("Failed to load categories. Please try again.");
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
          { field: { Name: "color_c" } },
          { field: { Name: "deal_count_c" } },
          { field: { Name: "Tags" } }
        ]
      };
      
      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response?.data) {
        toast.error("Category not found");
        return null;
      }
      
      const category = response.data;
      return {
        Id: category.Id,
        id: category.Id.toString(),
        name: category.name_c || category.Name || "",
        color: category.color_c || "#2196f3",
        dealCount: category.deal_count_c || 0
      };
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load category. Please try again.");
      return null;
    }
  }

  async create(categoryData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Name: categoryData.name || categoryData.Name,
          name_c: categoryData.name || categoryData.Name,
          color_c: categoryData.color || "#2196f3",
          Tags: categoryData.tags || ""
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
          console.error(`Failed to create ${failed.length} categories:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const newCategory = successful[0].data;
          return {
            Id: newCategory.Id,
            id: newCategory.Id.toString(),
            name: newCategory.name_c || newCategory.Name || "",
            color: newCategory.color_c || "#2196f3",
            dealCount: 0
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating category:", error?.response?.data?.message || error);
      toast.error("Failed to create category. Please try again.");
      return null;
    }
  }

  async update(id, categoryData) {
    try {
      if (!this.apperClient) this.initializeClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          Name: categoryData.name || categoryData.Name,
          name_c: categoryData.name || categoryData.Name,
          color_c: categoryData.color || "#2196f3",
          Tags: categoryData.tags || ""
        }]
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
          console.error(`Failed to update ${failed.length} categories:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updatedCategory = successful[0].data;
          return {
            Id: updatedCategory.Id,
            id: updatedCategory.Id.toString(),
            name: updatedCategory.name_c || updatedCategory.Name || "",
            color: updatedCategory.color_c || "#2196f3",
            dealCount: updatedCategory.deal_count_c || 0
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating category:", error?.response?.data?.message || error);
      toast.error("Failed to update category. Please try again.");
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
          console.error(`Failed to delete ${failed.length} categories:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting category:", error?.response?.data?.message || error);
      toast.error("Failed to delete category. Please try again.");
      return false;
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;