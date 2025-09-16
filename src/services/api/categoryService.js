import categoriesData from "@/services/mockData/categories.json";
import dealService from "@/services/api/dealService";

class CategoryService {
  constructor() {
    this.storageKey = "lifedeal-vault-categories";
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(categoriesData));
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveData(categories) {
    localStorage.setItem(this.storageKey, JSON.stringify(categories));
  }

  async getAll() {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const categories = this.getData();
        const deals = await dealService.getAll().catch(() => []);
        
        // Update deal counts for categories
        const categoriesWithCounts = categories.map(category => ({
          ...category,
          dealCount: deals.filter(deal => deal.category === category.name).length
        }));
        
        resolve([...categoriesWithCounts]);
      }, 200);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categories = this.getData();
        const category = categories.find(c => c.Id === parseInt(id));
        if (category) {
          resolve({ ...category });
        } else {
          reject(new Error("Category not found"));
        }
      }, 200);
    });
  }

  async create(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = this.getData();
        const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.Id)) : 0;
        const newCategory = {
          ...categoryData,
          Id: maxId + 1,
          id: (maxId + 1).toString(),
          dealCount: 0
        };
        
        categories.push(newCategory);
        this.saveData(categories);
        resolve({ ...newCategory });
      }, 300);
    });
  }

  async update(id, categoryData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categories = this.getData();
        const index = categories.findIndex(c => c.Id === parseInt(id));
        
        if (index !== -1) {
          const updatedCategory = {
            ...categories[index],
            ...categoryData,
            Id: categories[index].Id,
            id: categories[index].Id.toString()
          };
          
          categories[index] = updatedCategory;
          this.saveData(categories);
          resolve({ ...updatedCategory });
        } else {
          reject(new Error("Category not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categories = this.getData();
        const index = categories.findIndex(c => c.Id === parseInt(id));
        
        if (index !== -1) {
          categories.splice(index, 1);
          this.saveData(categories);
          resolve(true);
        } else {
          reject(new Error("Category not found"));
        }
      }, 200);
    });
  }
}

const categoryService = new CategoryService();
export default categoryService;