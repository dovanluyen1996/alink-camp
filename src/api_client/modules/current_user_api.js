export default {
  async getCurrentUser() {
    const response = await this.get('/user');
    return response.data;
  },
  async updateCurrentUser(params) {
    const response = await this.put('/user', params);
    return response.data;
  },
  async changeCurrentUserEmail(params) {
    const response = await this.put('/user/change_email', params);
    return response.data;
  },
};
