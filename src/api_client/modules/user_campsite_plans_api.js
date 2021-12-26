export default {
  async getUserCampsitePlans(params) {
    const response = await this.get('/user_campsite_plans', params);
    return response.data;
  },
  async getUserCampsitePlan(id) {
    const response = await this.get(`/user_campsite_plans/${id}`);
    return response.data;
  },
  async createUserCampsitePlan(params) {
    const response = await this.post('/user_campsite_plans', params);
    return response.data;
  },
  async updateUserCampsitePlan(id, params) {
    const response = await this.put(`/user_campsite_plans/${id}`, params);
    return response.data;
  },
  async deleteUserCampsitePlan(id) {
    const response = await this.delete(`/user_campsite_plans/${id}`);
    return response.data;
  },
};
