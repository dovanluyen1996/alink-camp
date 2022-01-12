export default {
  async getUsersFavorites() {
    const response = await this.get('/users_favorites');
    return response.data;
  },
  async createUsersFavorite(params) {
    const response = await this.post('/users_favorites', params);
    return response.data;
  },
  async deleteUsersFavorite(id) {
    const response = await this.delete(`/users_favorites/${id}`);
    return response.data;
  },
};
