import dealsData from "@/services/mockData/deals.json";

class DealService {
  constructor() {
    this.storageKey = "lifedeal-vault-deals";
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(dealsData));
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveData(deals) {
    localStorage.setItem(this.storageKey, JSON.stringify(deals));
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deals = this.getData();
        resolve([...deals]);
      }, 300);
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deals = this.getData();
        const deal = deals.find(d => d.Id === parseInt(id));
        if (deal) {
          resolve({ ...deal });
        } else {
          reject(new Error("Deal not found"));
        }
      }, 200);
    });
  }

  async create(dealData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deals = this.getData();
        const maxId = deals.length > 0 ? Math.max(...deals.map(d => d.Id)) : 0;
        const newDeal = {
          ...dealData,
          Id: maxId + 1,
          id: (maxId + 1).toString(),
          isUsed: false,
          lastAccessed: null,
          createdAt: new Date().toISOString()
        };
        
        deals.push(newDeal);
        this.saveData(deals);
        resolve({ ...newDeal });
      }, 300);
    });
  }

  async update(id, dealData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deals = this.getData();
        const index = deals.findIndex(d => d.Id === parseInt(id));
        
        if (index !== -1) {
          const updatedDeal = {
            ...deals[index],
            ...dealData,
            Id: deals[index].Id,
            id: deals[index].Id.toString()
          };
          
          deals[index] = updatedDeal;
          this.saveData(deals);
          resolve({ ...updatedDeal });
        } else {
          reject(new Error("Deal not found"));
        }
      }, 300);
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deals = this.getData();
        const index = deals.findIndex(d => d.Id === parseInt(id));
        
        if (index !== -1) {
          deals.splice(index, 1);
          this.saveData(deals);
          resolve(true);
        } else {
          reject(new Error("Deal not found"));
        }
      }, 200);
    });
  }
}

const dealService = new DealService();
export default dealService;