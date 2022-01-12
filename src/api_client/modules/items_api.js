export default {
  async getItems() {
    const response = await this.get('/items');
    return response.data;
  },
  async getItem(id) {
    const response = await this.get(`/items/${id}`);
    return response.data;
  },
  async createItem(params) {
    const response = await this.post('/items', params);
    return response.data;
  },
  async updateItem(id, params) {
    const response = await this.put(`/items/${id}`, params);
    return response.data;
  },
  async deleteItem(id) {
    const response = await this.delete(`/items/${id}`);
    return response.data;
  },
};
